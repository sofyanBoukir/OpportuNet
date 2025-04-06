import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../components/UI/Input'
import { Conversation } from '../components/App/Conversation'
import { Button } from '../components/UI/Button'
import messageBg from '../../public/images/bgMessage.png'
import { ArrowDownCircleIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { IncomingMessage } from '../components/App/IncomingMessage'
import { OutgoingMessage } from '../components/App/OutgoingMessage'
import { deleteMessage, getConversations, getMessagesByConversation, getOnlineUsers, searchConversations, sendNewMessage, updateConversationLastMessageStatus } from '../services/conversation'
import { AppSelector } from '../selectors/AppSelector'
import { Link, useNavigate } from 'react-router-dom'
import socket from '../functions/socket'
import { useDispatch } from 'react-redux'


export const Messaging = () => {

    const [loadingConversation,setLoadingConversations] = useState(true);
    const [lastPage,setLastPage] = useState(null);
    const [totalConversations,setTotalConversations] = useState(null);
    const [conversations,setConversations] = useState([])
    const [page,setPage] = useState(1)
    const [selectedConversation,setSelectedConversation] = useState(null)
    const [loadMessages,setLoadMessages] = useState(false)
    const [messages,setMessages] = useState([])
    const [otherParticipant,setOtherParticipiant] = useState(null)
    const [message,setMessage] = useState('')
    const [searchInput,setSearchInput] = useState('');
    const [onlineUsers,setOnlineUsers] = useState([]);
    const selectedConversationRef = useRef(selectedConversation)
    const {messagedTimes} = AppSelector()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userData} = AppSelector()
    const loadingRef = useRef(false)

    const messagedTimesRef = useRef(messagedTimes);    
    useEffect(() => {
        messagedTimesRef.current = messagedTimes;
    }, [messagedTimes]);

    useEffect(() =>{
        selectedConversationRef.current = selectedConversation;
    },[selectedConversation])
    

    const _searchConversations = async () =>{
        const response = await searchConversations(localStorage.getItem('token'),searchInput);
        if(response.data.conversations){
            setConversations(response.data.conversations)
        }
    }

    const _getUserConversations = async () =>{
        try{
            if(loadingRef.current) return
            loadingRef.current = true
            setLoadingConversations(true)
            const response = await getConversations(localStorage.getItem('token'),page);
            loadingRef.current = false
            setLoadingConversations(false)
            if(response.status === 200){
                if(response.data.conversations){
                    setConversations((prevConv) => [...prevConv,...response.data.conversations])
                    setTotalConversations(response.data.totalConversations)
                    setLastPage(response.data.lastPage)
                }
            }
        }catch(err){
            //
        }
    }

    const _getMessagesByConversation = async () =>{
        try{
            setLoadMessages(true)
            const response = await getMessagesByConversation(localStorage.getItem('token'),selectedConversation._id);
            
            setLoadMessages(false)
            if(response.status === 200){
                if(response.data.messages){
                    setMessages(response.data.messages)
                }
            }
        }catch(err){
            //
        }
    }

    const _updateConversationLastMessageStatus = async () =>{
        if(selectedConversation.lastMessageStatus === 'seen') return;
        const response = await updateConversationLastMessageStatus(localStorage.getItem('token'),selectedConversation._id);
        if(response.status === 200){
            const updateConversations = conversations.map((conversation) => conversation._id === selectedConversation._id ? {...conversation,lastMessageStatus:'seen'} : conversation)
            setConversations(updateConversations)
            dispatch({type:'MESSAGE_SEEN',payload:selectedConversation._id})
        }
    }

    const _sendNewMessage = async () =>{
        try{
            if(message === '') return
            const response = await sendNewMessage(localStorage.getItem('token'),selectedConversation._id,{message,recipient:otherParticipant._id});            
            if(response.status === 200){
                const newMessage = response.data.newMessage;
                setMessages([...messages,
                    newMessage
                ])
                
                setMessage('')
                setConversations([])
                _getUserConversations()
            }
        }catch(err){
            //
        }
    }

    const _deleteMessage = async (message) =>{
        const response = await deleteMessage(localStorage.getItem('token'),message._id);        
        if(response.status === 200){
            const updateMessages = messages.filter((mssg) => mssg._id !== message._id);
            setMessages(updateMessages);
        }
    }


    const notificationSound = new Audio("../../public/audios/notificationSound.wav");

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
    
        const handleConnect = () => {
            socket.emit("registerUser", localStorage.getItem("token"));
        };
    
        const handleNewMessage = (newMessage) => {
            setConversations([]);
            _getUserConversations();
            
            const currentConv = selectedConversationRef.current;

            if (currentConv && newMessage.conversation === currentConv._id) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                dispatch({type:'MESSAGE_SEEN',payload:currentConv._id})
                notificationSound.play();
                AlwaysScrollToBottom();
            }
        };

        const updateOnlineUsers = (disconnectedUser) =>{
            const newOnlineUsers = onlineUsers.filter((onlineUser) => onlineUser._id !== disconnectedUser);
            setOnlineUsers(newOnlineUsers);
        }
    
        socket.on("connect", handleConnect);
        socket.on('newMessage', handleNewMessage);
        socket.on('updateOnlineUsers',updateOnlineUsers)
        return () => {
            socket.off("connect", handleConnect);
            socket.off('newMessage', handleNewMessage);
        };
    }, []);

    useEffect(() =>{
        _getUserConversations()
    },[page])

    useEffect(() =>{
        searchInput !== '' && _searchConversations();
    },[searchInput])

    
    useEffect(() =>{
        const _getOnlineUsers = async () =>{
            const response = await getOnlineUsers(localStorage.getItem('token'));
            if(response.status === 200 && response.data.onlineUsers){
                setOnlineUsers(response.data.onlineUsers);
            }
        }
        _getOnlineUsers()
    },[])

    useEffect(() =>{
        _getMessagesByConversation();
        _updateConversationLastMessageStatus()
    },[selectedConversation]);
  return (
    <div className="relative px-3 top-16">
        <div className="dark:bg-black bg-white dark:text-white rounded-xl shadow-md px-5 py-5 lg:flex">
            <div className='lg:w-[30%] lg:border-r border-r-gray-500 lg:pr-10'>
                <h1 className='text-2xl font-semibold'>Messaging</h1>

                <div className="mt-1 flex gap-2 w-full overflow-x-auto py-2">
                    {onlineUsers && onlineUsers.length ? (
                        onlineUsers.map((onlineUser, index) => (
                            <div key={index} className="flex flex-col items-center relative min-w-[100px] sm:min-w-[120px] md:min-w-[110px]">
                                <div className="relative w-20 h-20">
                                    <img src={onlineUser.profilePictureUrl} className="rounded-full w-full h-full object-cover" alt={onlineUser.name + ' avatar'}/>
                                    <div className="absolute bottom-0 right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
                                </div>
                                <p className="text-sm font-semibold text-center">{onlineUser.name}</p>
                            </div>
                        ))
                    ): null}
                </div>

                <div className='mt-5'>
                    <Input type={'text'} placeholder={'Search people...'} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} 
                    className={'w-[100%] border-2 outline-none dark:text-white border-gray-400 rounded-sm px-3 py-2'}/>
                </div>
                
                <div className={`mt-6 flex flex-nowrap lg:flex-col gap-3 lg:h-[55vh] ${onlineUsers.length === 0 && 'lg:h-[70vh]'} overflow-auto`}>
                    {
                        !loadingConversation && conversations && conversations.length ?
                            conversations.map((conversation,index) =>{
                                return <Conversation key={index} conversation={conversation} setOtherParticipiant={setOtherParticipiant} setSelectedConversation={setSelectedConversation}/>
                            })
                        :<p className='text-xl font-semibold'>No conversations yet!</p>
                    }
                  {!loadingConversation && lastPage !== page && totalConversations !== 0 && <ArrowDownCircleIcon onClick={() => setPage(page+1)} className="flex mx-auto cursor-pointer my-3 text-blue-700 hover:text-blue-600 duration-200 w-12 h-12" /> }
                </div>
            </div>
            <div className='w-[75%] pl-[2%]'>
                <div className='w-[140%] lg:w-[100%]'>
                    {
                        selectedConversation !== null && <>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-3 items-center'>
                                    <img src={otherParticipant.profilePictureUrl} className='rounded-full w-12 h-12'/>
                                    <div>
                                        <Link className='text-xl font-semibold cursor-pointer hover:text-blue-800 duration-200' to={`/user/profile/${otherParticipant._id}`}>{otherParticipant.name}</Link>
                                        <p className='text-gray-600'>{otherParticipant.headLine}</p>
                                    </div>
                                </div>

                                {
                                    selectedConversation.job ?
                                        <div>
                                            <Button text={'View job'} className={'bg-blue-500 text-white'} onClick={() => navigate(`/job-detail/${selectedConversation.job._id}`)}/>
                                        </div>
                                    :null
                                }
                            </div>
                            <hr className='text-gray-200 border mt-2 w-4/4'></hr>
                            <div className='relative lg:mt-2 w-[100%] h-[70vh] overflow-auto' style={{backgroundSize:"cover",backgroundImage: `url(${messageBg})`}}>
                                <div className='px-3 py-2'>
                                    <div className="w-full flex flex-col gap-2 lg:mb-0 mb-20">
                                        {
                                            !loadMessages && messages && messages.length ?
                                                messages.map((message,index) =>{
                                                    if(message.sender === userData._id){
                                                        return <OutgoingMessage key={index} message={message} deleteMessage={_deleteMessage}/>
                                                    }else{
                                                        return <IncomingMessage key={index} message={message}/>
                                                    }
                                                })
                                            :null
                                        }
                                    </div>
                                    <AlwaysScrollToBottom />
                                </div>
                            </div>
                            <div className='fixed bottom-14 lg:relative lg:bottom-0 mt-2 w-[85%] lg:w-[100%] flex gap-2 items-center'>
                                <Input type={'text'} placeholder={'Type somthing....'} value={message} 
                                onChange={(e) => setMessage(e.target.value)} className={'w-[90%] py-3 px-5 border dark:text-white border-gray-400 rounded-3xl outline-none'}/>
                                <Button text={'Send'} className={'text-white bg-blue-500 w-[10%]'} onClick={_sendNewMessage}/>
                            </div>
                        </>
                    }
                    {
                        selectedConversation === null && <div>
                        <div className='flex mt-52'>
                                <div className='mx-auto flex justify-center gap-2 flex-col'>
                                    <ChatBubbleOvalLeftEllipsisIcon className='w-24 h-24 text-black dark:text-white mx-auto'/>
                                    <h1 className='text-4xl font-semibold'>Start new Conversation</h1>
                                    <span className='text-lg text-gray-600 text-center'>Click on any conversation to show messages</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}


const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
    return <div ref={elementRef} />;
  };
  
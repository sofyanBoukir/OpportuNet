import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../components/UI/Input'
import { Conversation } from '../components/App/Conversation'
import defaultImage from '../../public/images/profilDefault.png'
import { Button } from '../components/UI/Button'
import messageBg from '../../public/images/bgMessage.png'
import { ChatBubbleOvalLeftEllipsisIcon, CheckIcon } from '@heroicons/react/24/outline'
import { IncomingMessage } from '../components/App/IncomingMessage'
import { OutgoingMessage } from '../components/App/OutgoingMessage'
import { getConversations, getMessagesByConversation, sendNewMessage, updateConversationLastMessageStatus } from '../services/conversation'
import { AppSelector } from '../selectors/AppSelector'
import { Link } from 'react-router-dom'
import socket from '../functions/socket'
import { useDispatch } from 'react-redux'

export const Messaging = () => {

    const [loadingConversation,setLoadingConversations] = useState(false);
    const [lastPage,setLastPage] = useState(null);
    const [totalConversations,setTotalConversations] = useState(null);
    const [conversations,setConversations] = useState([])
    const [page,setPage] = useState(1)
    const [selectedConversation,setSelectefConversation] = useState(null)
    const [loadMessages,setLoadMessages] = useState(false)
    const [messages,setMessages] = useState([])
    const [otherParticipant,setOtherParticipiant] = useState(null)
    const [message,setMessage] = useState('')
    const dispatch = useDispatch()
    const {userData} = AppSelector()

    const _getUserConversations = async () =>{
        try{
            setLoadingConversations(true)
            const response = await getConversations(localStorage.getItem('token'),page);
            
            setLoadingConversations(false)
            if(response.status === 200){
                if(response.data.conversations){
                    setConversations(response.data.conversations)
                }
            }
        }catch(err){
            //
        }
    }

    const _getMessagesByConversation = async () =>{
        try{
            setLoadMessages(true)
            const response = await getMessagesByConversation(localStorage.getItem('token'),selectedConversation);
            console.log(response);
            
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
        const response = await updateConversationLastMessageStatus(localStorage.getItem('token'),selectedConversation);
        if(response.status === 200){
            const updateConversations = conversations.map((conversation) => conversation._id === selectedConversation ? {...conversation,lastMessageStatus:'seen'} : conversation)
            setConversations(updateConversations)
            dispatch({type:'UPDATE_MESSAGED_TIMES',payload:0})
        }
    }

    const _sendNewMessage = async () =>{
        try{
            const response = await sendNewMessage(localStorage.getItem('token'),selectedConversation,{message,recipient:otherParticipant._id});            
            if(response.status === 200){
                setMessages([...messages,{
                    createdAt : new Date(),
                    message : message,
                    sender: userData._id
                }])
                setMessage('')
                const updateConversations = conversations.map((conversation) => conversation._id === selectedConversation ? {...conversation,lastMessage:message} : conversation)
                setConversations(updateConversations)
            }
        }catch(err){
            //
        }
    }
    const notificationSound = new Audio("../../public/audios/notificationSound.wav");

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        
            socket.on("connect", () => {
                console.log("connected to the server");
            });
                socket.emit("registerUser", localStorage.getItem("token"));
                socket.on('newMessage',(newMessage) =>{
                    setMessages((prevMessages) => [...prevMessages,newMessage])
                    notificationSound.play()
                    AlwaysScrollToBottom()
                })
            };
    }, []);

    useEffect(() =>{
        _getUserConversations()
    },[page])

    useEffect(() =>{
        _getMessagesByConversation();
        _updateConversationLastMessageStatus();
    },[selectedConversation])
  return (
    <div className="px-3 relative top-16">
        <div className="bg-white dark:bg-black dark:text-white rounded-xl shadow-md px-10 py-5 lg:flex">
            <div className='lg:w-[30%] lg:border-r border-r-gray-500 lg:pr-10'>
                <h1 className='text-2xl font-semibold'>Messaging</h1>
                <div className='mt-5'>
                    <Input type={'text'} placeholder={'Search people...'} className={'w-[100%] border-2 outline-none dark:text-white border-gray-400 rounded-sm px-3 py-2'}/>
                </div>

                <div className='mt-6 flex flex-nowrap lg:flex-col gap-3 lg:h-[70vh] overflow-auto'>
                    {
                        !loadingConversation && conversations && conversations.length ?
                            conversations.map((conversation,index) =>{
                                return <Conversation key={index} conversation={conversation} setOtherParticipiant={setOtherParticipiant} setSelectefConversation={setSelectefConversation}/>
                            })
                        :null
                    }
                </div>
            </div>
            <div className='w-[75%] pl-[2%]'>
                <div className='lg:fixed w-[140%] lg:w-[65%]'>
                    {
                        selectedConversation !== null && <>
                            <div className='flex gap-3 items-center'>
                                <img src={otherParticipant.profilePictureUrl} className='rounded-full w-12 h-12'/>
                                <div>
                                    <Link className='text-xl font-semibold cursor-pointer hover:text-blue-800 duration-200' to={`/user/profile/${otherParticipant._id}`}>{otherParticipant.name}</Link>
                                    <p className='text-gray-600'>{otherParticipant.headLine}</p>
                                </div>
                            </div>
                            <hr className='text-gray-200 border mt-2 w-4/4'></hr>
                            <div className='relative lg:mt-2 w-[100%] h-[70vh] overflow-auto' style={{backgroundSize:"cover",backgroundImage: `url(${messageBg})`}}>
                                <div className='px-3 py-2'>
                                    <div className="w-full flex flex-col gap-2 lg:mb-0 mb-20">
                                        {
                                            !loadMessages && messages && messages.length ?
                                                messages.map((message) =>{
                                                    if(message.sender === userData._id){
                                                        return <OutgoingMessage message={message}/>
                                                    }else{
                                                        return <IncomingMessage message={message}/>
                                                    }
                                                })
                                            :null
                                        }
                                    </div>
                                    <AlwaysScrollToBottom />
                                </div>
                                <div className='fixed bottom-14 lg:bottom-10 mt-2 w-[100%] flex gap-2 items-center'>
                                    <Input type={'text'} placeholder={'Type somthing....'} value={message} 
                                    onChange={(e) => setMessage(e.target.value)} className={'w-[60%] py-3 px-5 border dark:text-white border-gray-400 rounded-3xl outline-none'}/>
                                    <Button text={'Send'} className={'text-white bg-blue-500'} onClick={_sendNewMessage}/>
                                </div>
                            </div>
                        </>
                    }
                    {
                        selectedConversation === null && <div>
                        <div className='flex mt-52'>
                                <div className='mx-auto flex justify-center gap-2 flex-col'>
                                    <ChatBubbleOvalLeftEllipsisIcon className='w-24 h-24 text-black mx-auto'/>
                                    <h1 className='text-4xl font-semibold'>Start new Conversation</h1>
                                    <span className='text-lg text-gray-700 text-center'>Click on any conversation to show messages</span>
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
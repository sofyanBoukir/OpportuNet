import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { AppSelector } from '../../selectors/AppSelector';
import { getConversations, sendPostToMultipleUsers } from '../../services/conversation';
import { Button } from '../UI/Button';
import { CheckCircle } from '@mui/icons-material';
import { Notification } from '../UI/Notification';

export const SharePost = ({setSharePost,postId}) => {
    const [loading,setLoading] = useState(true);
    const [conversations,setConversations] = useState([]);
    const [page,setPage] = useState(1)
    const [lastPage,setLastPage] = useState(null);
    const [totalConversations,setTotalConversations] = useState(null);
    const [otherParticipants,setOtherParticipants] = useState([]);
    const [selectedConversations,setSelectedConversations] = useState([]);
    const [sendLoading,setSendLoading] = useState(false)
    const [notification,setNotification] = useState(null)

    const loadingRef = useRef(false)
    const {userData} = AppSelector()

    const _getConversations = async () =>{
        try{
            if(loadingRef.current) return
            loadingRef.current = true
            setLoading(true)
            const response = await getConversations(localStorage.getItem('token'),page)
            loadingRef.current = false
            
            setLoading(false)
            if(response.status === 200){
                if(response.data.conversations){
                    setConversations((prevConv) => [...prevConv,...response.data.conversations])
                    setTotalConversations(response.data.totalConversations)
                    setLastPage(response.data.lastPage)
                        
                    response.data.conversations.map((conversation) =>{
                        const otherParticipant = !conversation.job ? conversation.participants.find((participant) => participant._id !== userData._id) : null
                        const conversationId = !conversation.job ? conversation._id : null
                        otherParticipant !== null && conversationId !== null ? setOtherParticipants((prevData) => [...prevData,{otherParticipant,conversationId}]) : null;
                    })
                }
            }
        }catch(err){
            setLoading(false)
            //
        }
    }    

    const selectConversation = (convId) =>{
        if(selectedConversations.includes(convId)){
            setSelectedConversations(selectedConversations.filter((_id) => _id !== convId))
        }else{
            setSelectedConversations((prevData) => [...prevData,convId]);
        }
    }

    const sendPost = async () =>{
        try{
            setNotification(null)
            setSendLoading(true);
            const response = await sendPostToMultipleUsers(localStorage.getItem('token'),postId,selectedConversations);
            setSendLoading(false)
            console.log(response);
            if(response.status === 200){
                setNotification({type:'success',message:response.data.message});
            }
        }catch(err){
            setSendLoading(false)
            //
        }
    }


    useEffect(() =>{
        _getConversations();
    },[page])
  return (
    <div className="fixed inset-0 flex items-center bg-black/50 dark:text-gray-200 text-gray-700 justify-center backdrop-blur-xs z-20">
        <div className="bg-white dark:bg-black w-[100%] lg:w-[40%] px-8 py-6 rounded-lg shadow-xl max-h-96 overflow-auto">
            <div className='flex justify-between items-center mb-2'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <p className='text-2xl font-semibold'>Share this post</p>
                    </div>
                </div>
                <div>
                    <div className='text-xl w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-200 duration-200'>
                        <XMarkIcon className='w-8 h-8' onClick={() => setSharePost(null)}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-4 md:gap-6 lg:gap-8 flex-wrap justify-center md:justify-start'>
                {
                    loading && <div className='w-full text-center py-4'>...Loading</div>
                }
                {
                    !loading && conversations && conversations.length && otherParticipants && otherParticipants.length ?
                        otherParticipants.filter(Boolean).map((otherParticipant) => {
                            return (
                                <div 
                                    key={otherParticipant.conversationId}
                                    className={`flex flex-col gap-1 items-center cursor-pointer relative p-2 w-24 sm:w-28 md:w-32`}
                                    onClick={() => selectConversation(otherParticipant.conversationId)}
                                >
                                    <div className='relative'>
                                        <img 
                                            src={otherParticipant?.otherParticipant?.profilePictureUrl} 
                                            className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover'
                                            alt={otherParticipant?.otherParticipant?.name}
                                        />
                                        {
                                            selectedConversations.includes(otherParticipant.conversationId) && 
                                            <CheckCircle className='text-blue-600 absolute -bottom-1 -right-1 bg-white rounded-full' size={20}/>
                                        }
                                    </div>
                                    <p className='text-sm sm:text-base font-semibold text-center truncate w-full'>
                                        {otherParticipant?.otherParticipant?.name}
                                    </p>
                                </div>
                            )
                        })
                    : null
                }
                {
                    !loading && conversations.length === 0 && 
                    <h1 className='text-lg md:text-xl font-semibold w-full text-center py-8'>
                        Please start a conversation with someone
                    </h1>
                }
            </div>
            {
                !loading && conversations.length && <div className='mt-5'>
                    <Button type={'button'} disabled={selectedConversations.length === 0} onClick={sendPost} loading={sendLoading}
                    text={`${(selectedConversations.length === 1  || selectedConversations.length === 0) ? 'Send' : 'Send Separately'}`} 
                    className={`w-[100%] text-center text-white ${selectedConversations.length === 0 ? 'bg-blue-400' : 'bg-blue-600'}`}/>    
                </div>
            }
            {
                notification && <Notification type={notification.type} message={notification.message} />
            }
            {!loading && lastPage !== page && totalConversations !== 0 && <Button text={'View more'} className={'bg-blue-600 text-white'} onClick={() => setPage(page+1)}/> }
        </div>
    </div>
  )
}

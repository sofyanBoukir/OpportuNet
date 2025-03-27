import React from 'react'
import defaultImage from '../../../public/images/profilDefault.png'
import { AppSelector } from '../../selectors/AppSelector'
import moment from 'moment/moment'

export const Conversation = ({conversation,setSelectefConversation,setOtherParticipiant}) => {
    const {userData} = AppSelector()

    const otherParticipant = conversation.participants.find((participant) => participant._id !== userData._id)
    
  return (
    <>
        <div onClick={() => {setSelectefConversation(conversation._id);setOtherParticipiant(otherParticipant)}} className='dark:hover:bg-gray-900 px-3 py-1 lg:flex items-center lg:text-start text-center lg:justify-between cursor-pointer duration-200 hover:bg-gray-100'>
            <div className='lg:flex gap-3 items-center'>
                <img src={otherParticipant.profilePictureUrl} className='rounded-full w-12 h-12 mx-auto'/>
                <div>
                    <p className='text-xl font-semibold'>{otherParticipant.name}</p>
                    <span className={`hidden lg:block ${conversation.lastMessageStatus === 'sent' ? 'font-semibold text-black dark:text-white' : 'text-gray-600 '}`}>{conversation.lastMessage.substr(0,30)}...</span>
                </div>
            </div>
            <div>
                <span className='text-gray-500 font-semibold'>{moment(conversation.updatedAt).fromNow()}</span>
            </div>
        </div>
        <hr className='border border-gray-200'></hr>
    </>
  )
}

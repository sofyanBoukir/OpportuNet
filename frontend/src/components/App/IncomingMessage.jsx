import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const IncomingMessage = ({message}) => {
    const post = message.post;
    const navigate = useNavigate();


  return (
    <div className="flex bg-blue-500 relative flex-col self-start max-w-[70%] rounded-tl-none px-6 py-2 rounded-3xl break-words">
        <span className="text-white font-semibold break-words">
            {message.message}
            {post && <div onClick={() => navigate(`/post/${post._id}`)} className='cursor-pointer'>
                    <div className='flex gap-2 items-center'>
                        <img src={post.user.profilePictureUrl} className='w-10 h-10 rounded-full'/>
                        <div>
                            <p className='text-xl'>{post.user.name}</p>   
                            <span>{post.user.headLine}</span>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <img src={post.imageUrl}/>
                        <span>{post.content}</span>
                    </div>
                </div>}
        </span>
        <span className='text-gray-100 flex justify-end'>{moment(message.createdAt).format('LT')}</span>
    </div>
    )
}

import moment from 'moment';
import React from 'react'
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const Comment = ({comment}) => {
  return (
    <div className="flex flex-row items-start w-[100%] mt-2 gap-2">
        <div className="w-8 lg:w-8">
            <img
            src={serverUrl+comment.user.profile_picture}
            className="rounded-full"
            alt=""
            />
        </div>
        <div className="w-auto rounded-tl-none bg-gray-200 rounded-2xl px-3 py-2">
            <span className="text-xl font-semibold">{comment.user.name} <span className="text-gray-500 text-sm">{moment(comment.createdAt).fromNow()}</span></span>
            <p>{comment.comment}</p>
        </div>
    </div> 
  )
}

import moment from 'moment'
import React from 'react'

export const IncomingMessage = ({message}) => {
  return (
    <div className="flex bg-blue-500 relative flex-col self-start max-w-[70%] rounded-tl-none px-6 py-2 rounded-3xl break-words">
        <span className="text-white font-semibold break-words">
            {message.message}
        </span>
        <br></br>
        <span className='text-gray-100 flex justify-end'>{moment(message.createdAt).format('LT')}</span>
    </div>
    )
}

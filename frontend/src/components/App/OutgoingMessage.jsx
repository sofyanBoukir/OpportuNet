import { CheckIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React from 'react'

export const OutgoingMessage = ({message}) => {
  return (
    <div className="bg-gray-200 relative text-black self-end max-w-[70%] rounded-br-none px-6 py-2 rounded-3xl break-words">
        <span className="font-semibold break-words">
            {message.message}
        </span>
        <br></br>
        <div className='flex gap-2 items-center float-right relative'>
            <span className='text-gray-800'>{moment(message.createdAt).format('LT')}</span>
        </div>
    </div>
)
}

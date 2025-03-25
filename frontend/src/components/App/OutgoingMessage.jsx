import { CheckIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const OutgoingMessage = () => {
  return (
    <div className="bg-gray-200 relative text-black self-end w-[60%] max-w-[70%] rounded-br-none px-4 py-2 rounded-3xl break-words">
        <span className="font-semibold break-words">
            Hello sofyansofyansofyansofyansofyansofyansofyansofyansofyansofyansofyansofyansofyan
        </span>
        <br></br>
        <div className='flex gap-2 items-center float-right relative'>
            <div className='flex'>
                <CheckIcon className='w-4 h-4 text-gray-500' strokeWidth={3}/>
                <CheckIcon className='w-4 h-4 absolute left-2 text-gray-500' strokeWidth={3}/>
            </div>
            <span className='text-gray-500 font-semibold'>delivred</span>
            <span className='text-gray-800'>12:30</span>
        </div>
    </div>
)
}

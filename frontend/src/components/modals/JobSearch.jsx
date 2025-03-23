import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const JobSearch = () => {
  return (
    <div className='flex gap-4 flex-col bg-white shadow-xl rounded-md border border-gray-300 w-[100%] px-3 py-5 '>
        <div className='flex gap-4 cursor-pointer'>
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-700'/>
            <span>Web developer</span>
        </div>

        <div className='flex gap-4'>
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-700'/>
            <span>js developer</span>
        </div>

        <div className='flex gap-4'>
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-700'/>
            <span>Ai engineer</span>
        </div>

        <div className='flex gap-4'>
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-700'/>
            <span>cloud architict</span>
        </div>

        <div className='flex gap-4'>
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-700'/>
            <span>Go developer</span>
        </div>
    </div>
  )
}

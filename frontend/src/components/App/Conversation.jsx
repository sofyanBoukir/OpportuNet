import React from 'react'
import defaultImage from '../../../public/images/profilDefault.png'

export const Conversation = () => {
  return (
    <>
        <div className='px-3 py-1 lg:flex items-center lg:text-start text-center lg:justify-between cursor-pointer duration-200 hover:bg-gray-100'>
            <div className='lg:flex gap-3 items-center'>
                <img src={defaultImage} className='rounded-full w-12 h-12 mx-auto'/>
                <div>
                    <p className='text-xl font-semibold'>Soufian boukir</p>
                    <span className='text-gray-600 hidden lg:block'>hello said how are you</span>
                </div>
            </div>
            <div>
                <span className='text-gray-500 font-semibold'>3 days</span>
            </div>
        </div>
        <hr className='border border-gray-200'></hr>
    </>
  )
}

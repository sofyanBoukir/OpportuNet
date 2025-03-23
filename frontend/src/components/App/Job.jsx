import React from 'react'

export const Job = () => {
  return (
    <div className='border border-blue-800 cursor-pointer shadow-sm rounded-sm px-3 py-4 bg-white'>
        <h1 className='text-3xl font-semibold hover:underline'>Server-side developer</h1>
        <span className='text-gray-800'>Capgemeni</span>
        <p className='text-gray-800'>Rabat</p>
        <br></br>
        <span className='text-lg bg-[#F3F2F1] font-semibold px-3 py-1.5 rounded-md'>Full time</span>
        <p className='mt-3'>Posted 3 days ago</p>
    </div>
  )
}

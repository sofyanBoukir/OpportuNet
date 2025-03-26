import { PlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { AddJob } from '../../components/modals/AddJob';

export const RecuiterJobs = () => {
    const [openAddJob , setOpenAddJob] = useState(false);
  return (
    <div className='relative md:top-40 top-20 mb-40'>
    <div className='2xl:px-[10%] md:px-[5%] px-[3%] w-[100%] flex md:flex-wrap md:flex-row flex-col md:gap-10 gap-5'>
        <div className='bg-white px-5 py-10 md:w-[22%] w-[94%] rounded-2xl shadow-2xl shadow-gray-300'>
            <h1 className='text-3xl font-semibold'>TITRE OF JOB</h1>
            <h3 className='text-lg font-semibold text-gray-600'>company name</h3>
            <h3 className='text-blue-600'>location</h3>
            <h3 className='text-black mt-10 bg-gray-100 w-[40%] text-center px-2 py-2'>empType</h3>
            <h3 className='text-gray-500 mt-5 px-2 text-sm font-semibold'>1 day ago</h3>
        </div>
        <div className='bg-white px-5 py-10 md:w-[22%] w-[94%] rounded-2xl shadow-2xl shadow-gray-300'>
            <h1 className='text-3xl font-semibold'>TITRE OF JOB</h1>
            <h3 className='text-lg font-semibold text-gray-600'>company name</h3>
            <h3 className='text-blue-600'>location</h3>
            <h3 className='text-black mt-10 bg-gray-100 w-[40%] text-center px-2 py-2'>empType</h3>
            <h3 className='text-gray-500 mt-5 px-2 text-sm font-semibold'>1 day ago</h3>
        </div>
        <div className='bg-white px-5 py-10 md:w-[22%] w-[94%] rounded-2xl shadow-2xl shadow-gray-300'>
            <h1 className='text-3xl font-semibold'>TITRE OF JOB</h1>
            <h3 className='text-lg font-semibold text-gray-600'>company name</h3>
            <h3 className='text-blue-600'>location</h3>
            <h3 className='text-black mt-10 bg-gray-100 w-[40%] text-center px-2 py-2'>empType</h3>
            <h3 className='text-gray-500 mt-5 px-2 text-sm font-semibold'>1 day ago</h3>
        </div>
        <div className='bg-white px-5 py-10 md:w-[22%] w-[94%] rounded-2xl shadow-2xl shadow-gray-300'>
            <h1 className='text-3xl font-semibold'>TITRE OF JOB</h1>
            <h3 className='text-lg font-semibold text-gray-600'>company name</h3>
            <h3 className='text-blue-600'>location</h3>
            <h3 className='text-black mt-10 bg-gray-100 w-[40%] text-center px-2 py-2'>empType</h3>
            <h3 className='text-gray-500 mt-5 px-2 text-sm font-semibold'>1 day ago</h3>
        </div>
        <div onClick={()=>setOpenAddJob(true)} className='bg-white px-5 py-10 md:w-[22%] w-[94%] rounded-2xl shadow-2xl shadow-gray-300 flex flex-col items-center justify-center border-dashed border-3 border-gray-400 hover:cursor-pointer'>
            <h1 className='text-3xl font-semibold mb-5'>Add New Job</h1>
            <PlusIcon className='w-[30%] text-blue-500' />
        </div>
    </div>
    {openAddJob && <AddJob setOpenAddJob={setOpenAddJob}/>}
</div>

  )
}

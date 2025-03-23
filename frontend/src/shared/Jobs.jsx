import React from 'react'
import { Input } from '../components/UI/Input'
import { Button } from '../components/UI/Button'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Job } from '../components/App/Job'
import { JobDetails } from '../components/App/JobDetails'
import { JobSkeleton } from '../components/skeletons/JobSkeleton'
import { JobDetailsSkeleton } from '../components/skeletons/JobDetailsSkeleton'

export const Jobs = () => {
  return (
    <div className='relative top-26'>
        <div className='w-[70%] lg:w-[45%] mx-auto'>
            <div className='flex gap-2 relative'>
                <MagnifyingGlassIcon className='absolute text-gray-600 top-4 left-3 w-6 h-6'/>
                <div className='w-[100%] flex relative'>
                    <Input type={'text'} placeholder={'Search for jobs, software developer ...'} className={'border rounded-md text-xl pl-12 border-gray-600 shadow-xl w-[100%] py-4 px-2 outline-none'} />
                    <button className='bg-[#1c51a1] text-lg text-white absolute right-2 rounded-md my-2 font-semibold cursor-pointer px-5 py-2 hover:bg-[#164081] duration-200'>
                        Find jobs
                    </button>
                </div>
            </div>
        </div>

        <div className='mt-10 px-[10%] flex gap-[2%] w-[100%]'>
            <div className='flex flex-col gap-3 w-[40%] h-[1000px] overflow-auto'>
                <Job />
                <Job />
                <Job />
                <Job />
                <Job />
                <Job />
                <Job />
                {/* <JobSkeleton /> */}
            </div>

            <div className='w-[58%] h-[100vh]  top-20'>
                <JobDetails />
                {/* <JobDetailsSkeleton /> */}
            </div>
        </div>
        
    </div>
  )
}

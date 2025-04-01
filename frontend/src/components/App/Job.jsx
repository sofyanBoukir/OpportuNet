import moment from 'moment'
import React from 'react'

export const Job = ({job,onClick,selectedJob}) => {
  return (
    <div className={`border ${selectedJob === job ? 'border-2 border-blue-600' : 'border-2 border-gray-300'} dark:text-white hover:shadow-2xl duration-200 cursor-pointer shadow-sm rounded-sm px-3 py-4 bg-white dark:bg-gray-900`} onClick={onClick}>
        <h1 className='text-3xl font-semibold hover:underline'>{job.title}</h1>
        <span className='text-gray-800 dark:text-gray-200'>{job.company}</span>
        <p className='text-gray-800 dark:text-gray-200'>{job.location}</p>
        <br></br>
        <span className='text-lg bg-[#F3F2F1] dark:bg-gray-900 font-semibold px-3 py-1.5 rounded-md'>{job.empType}</span>
        <p className='mt-3'>Posted {moment(job.createdAt).fromNow()}</p>
    </div>
  )
}

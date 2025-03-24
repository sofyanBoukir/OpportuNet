import moment from 'moment'
import React from 'react'

export const Job = ({job,onClick,selectedJob}) => {
  return (
    <div className={`border ${selectedJob === job ? 'border-2 border-blue-600' : 'border-2 border-gray-300'} hover:shadow-2xl duration-200 cursor-pointer shadow-sm rounded-sm px-3 py-4 bg-white`} onClick={onClick}>
        <h1 className='text-3xl font-semibold hover:underline'>{job.title}</h1>
        <span className='text-gray-800'>{job.company}</span>
        <p className='text-gray-800'>{job.location}</p>
        <br></br>
        <span className='text-lg bg-[#F3F2F1] font-semibold px-3 py-1.5 rounded-md'>{job.empType}</span>
        <p className='mt-3'>Posted {moment(job.createdAt).fromNow()}</p>
    </div>
  )
}

import React, { useState } from 'react'
import { Button } from '../UI/Button'
import { LinkIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { applyForJob } from '../../services/job';
import { ERROR_MESSAGES } from '../../constants/Errors';
import { Notification } from '../UI/Notification';

export const JobDetails = ({job,copyLink}) => {


    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState()


    const _applyForJob = async () =>{
        setNotification(null)
        try{
            setLoading(true);
            const response = await applyForJob(localStorage.getItem('token'),job._id);
            
            setLoading(false)
            if(response.status === 200){
                setNotification({type:'success',message:response.data.message})
                job.applicants.length+=1
            }
        }catch(err){
            setLoading(false)
            if(err.response.data.message){
                setNotification({type:'error',message:err.response.data.message})
            }else{
                setNotification({type:'error',message:ERROR_MESSAGES.SOMETHING_WENT_WRONG})
            }
        }
    }

  return (
    <div className='bg-white px-6 py-5 border border-gray-300 shadow-md w-[100%] rounded-md'>
        <div>
            <h1 className='text-3xl font-semibold'>{job.title}</h1>
            <div className='flex gap-2 text-gray-700'>
                <span className='text-lg'>{job.company} - </span>
                <span className='text-lg'>{job.location}</span>
            </div>
            <div className='mt-1'>
                <span className='px-3 font-semibold py-1 rounded-md bg-[#ede9e6]'>{job.empType}</span>
            </div>
            <div className='mt-3 flex gap-1'>
                <Button text={'Aplly now'} className={'bg-[#164081] text-white w-[15%]'} onClick={_applyForJob} loading={loading}/>
                <span className='bg-[#e0d6ce] flex items-center font-semibold px-2 py-1 rounded-md cursor-pointer'>
                    {job.applicants?.length + ' applicants'}
                </span>
                <button className='bg-[#e0d6ce] px-2 py-1 rounded-md cursor-pointer' onClick={copyLink}>
                    <LinkIcon className='w-6 h-6'/>
                </button>
            </div>
        </div>
        <div className='my-4'>
            <hr className='border-gray-400 shadow-xl'></hr>
        </div>
        <div>
            <h1 className='text-2xl font-semibold'>Location</h1>
            <div className='flex gap-1 text-gray-700 mt-2'>
                <MapPinIcon className='w-5 h-5'/>
                <span>{job.location}</span>
            </div>
        </div>

        <div className='my-4'>
            <hr className='border-gray-400 shadow-xl'></hr>
        </div>
        <div>
            <h1 className='text-2xl font-semibold'>Job description</h1>
            <div className='flex gap-1 text-gray-700 mt-2'>
                <span>{job.description}</span>
            </div>

            <div className='mt-4'>
                <h1 className='text-xl font-semibold text-gray-500'>Responsibilities</h1>
                <ul className='ml-10 list-disc text-gray-700 flex flex-col gap-2 mt-1'>
                    {/* <li>Co-développer des agents IA permettant d’automatiser les flux de travail, de traiter des documents et d’améliorer la prise de décision.</li>
                    <li>Implémenter des systèmes RAG pour améliorer la récupération des connaissances et la qualité des réponses générées par l’IA.</li>
                    <li>Intégrer des systèmes IA aux outils métiers existants (CRM, ERP, Google Workspace, WhatsApp, etc.).</li>
                    <li>Participer à l’élaboration de solutions low-code/no-code pour faciliter l’adoption de l’IA.</li> */}
                    {
                        job.responsibilities && job.responsibilities.length ?
                            job.responsibilities.map((responsibility) =>{
                                return <li>{responsibility}</li>
                            })
                        : 'No setted'
                    }
                </ul>
            </div>

            <div className='mt-4'>
                <h1 className='text-xl font-semibold text-gray-500'>Skills</h1>
                <ul className='ml-10 list-disc text-gray-700 flex flex-col gap-2 mt-1'>
                    {
                        job.skills && job.skills.length ?
                            job.skills.map((skill) =>{
                                return <li>{skill}</li>
                            })
                        : 'No setted'
                    }
                </ul>
            </div>

            <div className='mt-4'>
                <h1 className='text-xl font-semibold text-gray-500'>Salary range</h1>
                <p className='text-gray-700 ml-10 mt-1'>{job.salaryRange}</p>
            </div>
        <div className='my-4'>
            <hr className='border-gray-400 shadow-xl'></hr>
        </div>
        {
            notification && <Notification type={notification.type} message={notification.message} />
        }
        </div>
    </div>
  )
}

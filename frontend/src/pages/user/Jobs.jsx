import React, { useEffect, useRef, useState } from 'react'
import { ArrowDownCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input } from '../../components/UI/Input'
import { Job } from '../../components/App/Job'
import { JobDetails } from '../../components/App/JobDetails'
import { JobDetailsSkeleton } from '../../components/skeletons/JobDetailsSkeleton'
import { JobSkeleton } from '../../components/skeletons/JobSkeleton'
import { JobSearch } from '../../components/modals/JobSearch'
import { ERROR_MESSAGES } from '../../constants/Errors'
import { getJobs, searchForJobs } from '../../services/job'
import { Notification } from '../../components/UI/Notification'
import { copyText } from '../../functions/copyText'

export const Jobs = () => {

    const [postedJobs,setPostedJobs] = useState([]);
    const [loading,setLoading] = useState(true);
    const [errMessage,setErrMessage] = useState('');
    const [page,setPage] = useState(1);
    const searchRef = useRef(null);
    const loadingRef = useRef(false);
    const [lastPage,setLastPage] = useState(null);
    const [totalPostedJobs,setTotalPostedJobs] = useState(null)
    const [selectedJob,setSelectedJob] = useState()
    const [urlPath,setUrlPath] = useState('')
    const [notification,setNotification] = useState()
    const [query,setQuery] = useState('');
    const [searchResults,setSearchResults] = useState([])
    const [selectedResult,setSelectedResult] = useState('')


    const _getPostedJobs = async () => {
        try{    
            if(loadingRef.current) return;
            loadingRef.current = true
            const response = await getJobs(localStorage.getItem('token'),page);
            setTimeout(() => {
                setLoading(false)
            }, 3000);
            loadingRef.current = false
            if(response.data.postedJobs){
                setPostedJobs((prevData) => [...prevData, ...response.data.postedJobs])
                setUrlPath(window.location.href+"/"+response.data.postedJobs[0]._id)
                setSelectedJob(response.data.postedJobs[0])
                setTotalPostedJobs(response.data.totalPostedJobs);
                setLastPage(response.data.lastPage)
            }

        }catch(err){
            setLoading(false)
            if(err.response.data.message){
                setErrMessage(err.response.data.message)
            }else{
                setErrMessage(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
            }
        }
    }


    const _searchForJobs = async () =>{
        if(selectedResult !== ''){
            setQuery('')
            const response = await searchForJobs(localStorage.getItem('token'),selectedResult);
            
            if(response.data.jobs){
                setPostedJobs(response.data.jobs)
                setSelectedJob(response.data.jobs[0])
                setSelectedResult('')
            }
            return
        }


        const response = await searchForJobs(localStorage.getItem('token'),query)
        if(response.data.jobs){
            setSearchResults(response.data.jobs);
        }
    }

    useEffect(() =>{
        _getPostedJobs();
    },[page])

    useEffect(() =>{
        query !== '' && _searchForJobs();
        query === '' && setSearchResults([]);
    },[query,selectedResult])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
                setQuery('')
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

  return (
    <div className='relative top-26'>
        <div className='w-[70%] lg:w-[45%] mx-auto'>
            <div className='flex gap-2 relative' ref={searchRef}>
                <MagnifyingGlassIcon className='absolute text-gray-600 top-4 left-3 w-6 h-6'/>
                <div className='w-[100%] flex relative'>
                    
                    <Input value={query} onChange={(e) => setQuery(e.target.value)}
                    type={'text'} 
                    placeholder={'Search for jobs, software developer ...'} 
                    className={'border rounded-md text-xl pl-12 border-gray-600 shadow-xl w-[100%] py-4 px-2 outline-none'} />
                    
                    <button onClick={() => setSelectedResult(query)}
                    className='bg-[#1c51a1] text-lg text-white absolute right-2 rounded-md my-2 font-semibold cursor-pointer px-5 py-2 hover:bg-[#164081] duration-200'>
                        Find jobs
                    </button>
                </div>
                {
                    searchResults && searchResults.length ? <div className='absolute w-[100%] top-16 z-20'>
                            <JobSearch searchResults={searchResults} setSelectedResult={setSelectedResult}/>
                        </div>:null
                }
            </div>
        </div>

        <div className='mt-10 px-[10%] flex gap-[2%] w-[100%]'>
            <div className='flex flex-col gap-3 w-[40%] h-[1000px] overflow-auto'>
                {
                    !loading && postedJobs && postedJobs.length ?
                        postedJobs.map((job) =>{
                            return <Job job={job} onClick={() => {setSelectedJob(job);setUrlPath(window.location.href+"/"+job._id)}} selectedJob={selectedJob}/>
                        })
                    :null
                }
                {loading && <JobSkeleton />}
                {!loading && lastPage !== page && totalPostedJobs !== 0 && <ArrowDownCircleIcon onClick={() => setPage(page+1)} className="flex mx-auto cursor-pointer my-3 text-blue-700 hover:text-blue-600 duration-200 w-12 h-12" /> }
            </div>

            <div className='w-[58%] h-[100vh]  top-20'>
                {!loading && selectedJob && <JobDetails job={selectedJob} copyLink={() => copyText(urlPath,setNotification)}/>}
                { loading && <JobDetailsSkeleton /> }
            </div>
        </div>
        {
            notification && <Notification type={notification.type} message={notification.message}/>
        }
    </div>
  )
}

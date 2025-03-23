import { Skeleton } from '@mui/material'
import React from 'react'
const jobsLength = [1,2,3,4,5]

export const JobSkeleton = () => {
  return (
        <div className='flex flex-col gap-10 mt-2'>
            {
                jobsLength.map(() =>{
                    return <div className='flex justify-between w-[100%] items-center'>
                    <div className='flex  flex-col gap-2'>
                        <Skeleton animation="wave" height={30} width={500} />
                        <Skeleton animation="wave" height={15} width="70%" />
                        <Skeleton animation="wave" height={10} width="60%" />
                        <Skeleton animation="wave" height={13} width="80%" />
                    </div>
                </div>
                })
            }
        </div>
  )
}

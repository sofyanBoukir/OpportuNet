import { Skeleton } from '@mui/material'
import React from 'react'

export const JobDetailsSkeleton = () => {
  return (
        <div className='w-[100%]'>
            <div className='flex  flex-col gap-2'>
                <Skeleton animation="wave" height={40} width={500} />
                <Skeleton animation="wave" height={15} width="70%" />
                <Skeleton animation="wave" height={10} width="60%" />
                <Skeleton animation="wave" height={13} width="80%" />
            </div>
            
            <div className='flex flex-col gap-2 mt-10'>
                <Skeleton animation="wave" height={25} width="30%" />
                <Skeleton animation="wave" height={13} width="15%" />
            </div>

            <div className='flex flex-col gap-2 mt-10'>
                <Skeleton animation="wave" height={25} width="35%" />
                <Skeleton animation="wave" height={13} width="70%" />
                <Skeleton animation="wave" height={13} width="85%" />
                <Skeleton animation="wave" height={13} width="80%" />
                <Skeleton animation="wave" height={13} width="60%" />
                <Skeleton animation="wave" height={13} width="70%" />
                <Skeleton animation="wave" height={13} width="60%" />
                <Skeleton animation="wave" height={13} width="80%" />
            </div>

            <div className='flex flex-col gap-2 mt-10'>
                <Skeleton animation="wave" height={25} width="25%" />
                <Skeleton animation="wave" height={13} width="30%" />
                <Skeleton animation="wave" height={13} width="40%" />
                <Skeleton animation="wave" height={13} width="35%" />
                <Skeleton animation="wave" height={13} width="45%" />
            </div>
        </div>
  )
}

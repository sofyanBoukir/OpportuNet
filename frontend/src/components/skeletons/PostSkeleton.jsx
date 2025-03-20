import { Skeleton } from '@mui/material'
import React from 'react'

export const PostSkeleton = () => {
  return (
    <div>
        <div className='flex w-full items-center gap-3'>
            <div>
                <Skeleton animation="wave" variant="circular" width={60} height={60} />
            </div>
            <div className='w-full gap-1'>
                <Skeleton animation="wave" height={16} width="40%"/>
                <Skeleton animation="wave" height={11} width="30%" />
            </div>
        </div>
        <div className='mt-2 mb-2 flex flex-col gap-0.5'>
            <React.Fragment>
                <Skeleton animation="wave" height={10} />
                <Skeleton animation="wave" height={10} width="80%" />
                <Skeleton animation="wave" height={10} width="70%" />
            </React.Fragment>
        </div>
        <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
        <div className='flex justify-between mt-2'>
            <Skeleton animation="wave" height={15} width="20%" />
            <Skeleton animation="wave" height={15} width="20%" />
        </div>
    </div>

)
}

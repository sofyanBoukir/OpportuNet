import { Skeleton } from '@mui/material'
import React from 'react'

const followsLength = [1,2,3,4,5]
export const FollowsSkeleton = () => {
  return (
    <div className='flex flex-col gap-1 w-[100%]'>
        {
            followsLength.map(() =>{
                return <div className='flex items-center gap-2 w-[100%]'>
                        <Skeleton animation="wave" variant="circular" width={70} height={60} />
                        <div className='flex justify-between w-[100%] items-center'>
                            <div className='flex  flex-col gap-2'>
                                <Skeleton animation="wave" height={20} width={300} />
                                <Skeleton animation="wave" height={13} width="50%" />
                            </div>
                            <Skeleton animation="wave" height={18} width={150} />
                        </div>
                    </div>
            })
        }
    </div>
  )
}

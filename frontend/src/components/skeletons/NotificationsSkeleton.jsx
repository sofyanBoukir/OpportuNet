import { Skeleton } from '@mui/material';
import React from 'react'
const notLength = [1,2,3,4,5,6,7,8,9,10,11,12,13];

export const NotificationsSkeleton = () => {
  return (
        <div className='bg-white dark:bg-black border dark:border-gray-800 border-gray-200 shadow-md rounded-md px-3 py-1'>
            <div className='flex flex-col gap-1 mx-4'>
                {
                    notLength.map((num) => {
                        return <div className='flex w-full items-center gap-3'>
                                    <div>
                                        {
                                        num %2 === 0 ? <Skeleton animation="wave" variant="square" width={60} height={60} sx={{
                                            bgcolor: "var(--skeleton-bg)",
                                        }}
                                        className="dark:!bg-gray-700 !bg-gray-300"/> 
                                        : <Skeleton animation="wave" variant="circular" width={60} height={60} />
                                        }
                                    </div>
                                    <div className='w-full gap-1'>
                                        <Skeleton animation="wave" height={20} width="100%"/>
                                        <Skeleton animation="wave" height={20} width="80%"/>
                                    </div>
                                </div>
                    })
                }
            </div>
        </div>
  )
}


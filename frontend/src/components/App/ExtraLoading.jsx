import React from 'react'
import appLogo from '../../../public/appLogo.png'
import { LinearProgress } from '@mui/material'
export const ExtraLoading = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-white'>
        <div className="w-[15%] text-center">
            <img src={appLogo} className="mx-auto" />
            <LinearProgress />
        </div>
    </div>
  )
}

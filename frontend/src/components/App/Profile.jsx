import React from 'react'
import { AppSelector } from '../../selectors/AppSelector'
import coverProfile from '../../../public/images/coverProfile.png'

export const Profile = () => {
    const {userData } = AppSelector();
    
  return (
    <div className='w-[100%] dark:bg-black bg-white rounded-2xl'>
        <div className='relative'>
            <img src={coverProfile} className='h-[70px] rounded-t-2xl w-[100%]'/>
            <img src={userData.profilePictureUrl} className='rounded-full w-16 h-16 border-3 border-white absolute top-5 left-5 object-cover'/>
        </div>

        <div className='mt-7 px-4 pb-4'>
            <div>
                <h1 className='text-2xl font-semibold'>{userData.name}</h1>
                <h1 className='text-gray-800 dark:text-gray-200 text-lg'>{userData.headLine}</h1>
                <h1 className='text-gray-600 dark:text-gray-300 text-md'>{userData.location}</h1>
            </div>
        </div>
    </div>
  )
}

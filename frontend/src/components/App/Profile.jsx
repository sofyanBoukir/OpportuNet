import React from 'react'
import { AppSelector } from '../../selectors/AppSelector'
import coverProfile from '../../../public/images/coverProfil.png'
export const Profile = () => {
    const {userData } = AppSelector();
    console.log(userData);
    
  return (
    <div className='h-[200px] w-[90%] bg-white rounded-2xl'>
        <div>
            <img src={coverProfile} className='h-[60px] rounded-t-2xl w-[100%]'/>
            <img src={userData.profile_picture} className='rounded-full w-20 h-20'/>
        </div>
    </div>
  )
}

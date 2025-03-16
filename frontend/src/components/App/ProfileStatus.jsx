import React from 'react'
import { Profile } from './Profile'

export const ProfileStatus = () => {
  return (
    <div className="w-[20%] hidden flex-col left-[12%] fixed lg:flex">
        <div>
        <Profile />
        </div>
        <div className="bg-white rounded-xl mt-2 flex justify-center gap-5 py-2">
        <div className="text-center hover:bg-gray-50 duration-200 p-1 cursor-pointer">
            <p className="font-semibold text-xl">100</p>
            <span>Followers</span>
        </div>
        <div className="text-center hover:bg-gray-50 duration-200 p-1 cursor-pointer">
            <p className="font-semibold text-xl">100</p>
            <span>Followings</span>
        </div>
        </div>
    </div>
  )
}

import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { getFollowers, getFollowing } from '../../services/follow'
const serverURL = import.meta.env.VITE_SERVER_URL;

export const Follows = ({toView,setToView}) => {
    const [follows,setFollowes] = useState()



    const _getFollowers = async ()=>{
        const response = await getFollowers(localStorage.getItem('token'))
        console.log(response);
        
        if(response.status === 200){
            if(response.data.followers){
                setFollowes(response.data.followers[0].followers)

            }
        }
    }


    const _getFollowing = async ()=>{
        const response = await getFollowing(localStorage.getItem('token'))
        if(response.status === 200){
            if(response.data.following){
                setFollowes(response.data.following.following)
            }
        }
    }

    useEffect(() =>{
        toView === 'followers' && _getFollowers()
    },[toView])
  return (
    <div className="fixed inset-0 flex items-center bg-black/50 text-gray-700 justify-center backdrop-blur-xs">
        <div className="bg-white w-[60%] lg:w-[30%] px-8 py-6 rounded-lg shadow-xl">
            <div className='flex justify-between items-center mb-2'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <p className='text-xl font-semibold'>Your {toView}</p>
                    </div>
                </div>
                <div>
                    <div className='text-xl w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-200 duration-200'>
                        <XMarkIcon className='w-8 h-8' onClick={() => setToView(null)}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {
                    follows && follows.length?
                        follows.map((follow) =>{
                            return <div>
                                <div className='flex justify-between hover:bg-gray-100 duration-200 cursor-pointer'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={serverURL+follow.profile_picture} className='flex rounded-full w-10 h-10'/>
                                        <div>
                                            <p className='text-lg font-semibold'>{follow.name}</p>
                                            <span className='text-sm text-gray-700'>{follow.headLine}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    :null
                }
            </div>
        </div>
    </div>
  )
}

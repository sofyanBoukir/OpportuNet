import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { getFollowers, getFollowing, removeFollower } from '../../services/follow'
import { useNavigate } from 'react-router-dom';
import { Follow } from '../UI/Follow';
import { FollowsSkeleton } from '../skeletons/FollowsSkeleton';
import { AppSelector } from '../../selectors/AppSelector';

export const Follows = ({toView,setToView,mutualFollowing}) => {
    const [follows,setFollowes] = useState(mutualFollowing || null)
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('')
    const {userData} = AppSelector()
    const navigate = useNavigate()


    const _getFollowers = async ()=>{
        const response = await getFollowers(localStorage.getItem('token'))
        setTimeout(() => {
            setLoading(false)
        }, 3000);
        
        if(response.status === 200){
            if(response.data.followers[0].followers.length > 0){
                setFollowes(response.data.followers[0].followers)
            }else{
                setMessage('You dont followed yet')
            }
        }
    }


    const _getFollowing = async ()=>{
        const response = await getFollowing(localStorage.getItem('token'))
        setTimeout(() => {
            setLoading(false)
        }, 3000);
        
        if(response.status === 200){
            if(response.data.following[0].following.length > 0){
                setFollowes(response.data.following[0].following)
            }else{
                setMessage('Try to follow users')
            }
        }
    }

    const _removeFollower = async (followerId) =>{
        const response = await removeFollower(localStorage.getItem('token'),followerId)
        
        if(response.status === 200){
            if(response.data.deleted === true){
                const newFollowes = follows.filter((user) => user._id !== followerId);
                setFollowes(newFollowes);
                userData.followers = newFollowes;
            }
        }
    }

    useEffect(() =>{
        toView === 'followers' && _getFollowers();
        toView === 'following' && _getFollowing();
    },[toView])
  return (
    <div className="fixed inset-0 flex items-center bg-black/50 text-gray-700 justify-center backdrop-blur-xs z-20">
        <div className="bg-white w-[100%] lg:w-[50%] px-8 py-6 rounded-lg shadow-xl max-h-96 overflow-auto">
            <div className='flex justify-between items-center mb-2'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <p className='text-xl font-semibold'>{toView === 'Mutual following' ? null : 'Your'}  {toView}</p>
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
                    follows && !loading && follows.length?
                        follows.map((follow) =>{
                            return <div>
                                <div className='flex items-center justify-between py-1 rounded-md px-2 hover:bg-gray-50 duration-200 cursor-pointer'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={follow.profilePictureUrl} className='flex rounded-full w-10 h-10'/>
                                        <div>
                                            <p className='text-lg font-semibold' onClick={() => {navigate(`/user/profile/${follow._id}`);setToView(null)}}>{follow.name}</p>
                                            <span className='text-sm text-gray-700'>{follow.headLine}</span>
                                        </div>
                                    </div>
                                    <div className='w-[30%]'>
                                        {toView === 'followers' && (
                                            <div className='flex gap-1 items-center'>
                                                <Follow userId={follow._id} text={'back'} className={'bg-gray-200 py-1 text-black rounded-md w-[100%]'}/>
                                                <button className='cursor-pointer' onClick={() => _removeFollower(follow._id)}>
                                                    <XMarkIcon className='w-7 h-7'/>
                                                </button>
                                            </div>
                                        )}
                                        {toView === 'following' && <Follow userId={follow._id} className={'bg-gray-200 py-1 text-black rounded-md w-[100%]'}/>}
                                    </div>
                                </div>
                            </div>
                        })
                    :null
                }
                {
                    message && !loading && <span className='text-lg font-semibold text-gray-500'>{message}</span>
                }
                {
                    loading && <FollowsSkeleton />
                }
            </div>
        </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { AppSelector } from '../../selectors/AppSelector';
import { CheckIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { toggleFollow } from '../../services/follow';
import ExtraLoader from './ExtraLoader';

export const Follow = ({ type,disabled, userId,text, className }) => {
  
  const {userData} = AppSelector()
  const [isFollowed,setIsFollowed] = useState(userData.following.includes(userId))
  const [loading,setLoading] = useState(false);

  
  useEffect(() =>{
    setIsFollowed(userData.following.includes(userId))
  },[userData.following,userId])
  const _toggleFollow = async () =>{
    try{
      setLoading(true)
      const response = await toggleFollow(localStorage.getItem('token'),userId);
      
      setLoading(false)
      if(response.status === 200){
        if(response.data.followed === true){
          setIsFollowed(true);
          userData.following.push(userId);
        }else{
          setIsFollowed(false);
          const newFollowing = userData.following.filter((id) => id !== userId);
          userData.following = newFollowing;
        }
      }
    }catch(err){
      //
    }
  }

  return (
    <button
      type={type}
      onClick={_toggleFollow}
      className={`px-3 cursor-pointer ${
        loading ? "cursor-no-drop" : null
      } font-semibold flex items-center relative duration-200 justify-center text-md ${className}`}
      disabled={loading ? loading : disabled}
    >
      <div>
        {/* {svg ? svg : null}
        {loading ? "...Loading" : text} */}
        {
          !isFollowed && !loading && <div className='flex gap-2 items-center'>
            <UserPlusIcon className="w-5 h-5" strokeWidth={'2'}/> <span>Follow {text}</span>
          </div>
        }
        {
          isFollowed && !loading && <div className='flex gap-2 items-center'>
            <CheckIcon className="w-5 h-5" strokeWidth={'2'}/> <span>Followed</span>
          </div>
        }
        {
          loading && <ExtraLoader />
        }
      </div>    
    </button>
  );
};
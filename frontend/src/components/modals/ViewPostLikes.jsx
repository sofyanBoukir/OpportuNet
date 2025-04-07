import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { getWhoLikedPost } from '../../services/post';
import { Follow } from '../UI/Follow';
import { Link } from 'react-router-dom';
import { AppSelector } from '../../selectors/AppSelector';
import { HeartIcon } from '@heroicons/react/16/solid';

export const ViewPostLikes = ({setViewLikes,postId}) => {
    const [loading,setLoading] = useState(false);
    const [postLikes,setPostLikes] = useState([])
    const {userData} = AppSelector()

    const _getWhoLikedPost = async () =>{
        try{
            setLoading(true);
            const response = await getWhoLikedPost(localStorage.getItem('token'),postId);
            
            setLoading(false);
            if(response.status === 200){
                if(response.data.postLikes){
                    setPostLikes(response.data.postLikes.likes)
                }
            }
        }catch(err){
            //
        }
    }

    useEffect(() =>{
        _getWhoLikedPost()
    },[postId])
  return (
    <div className="fixed inset-0 flex items-center bg-black/50 dark:text-gray-200 text-gray-700 justify-center backdrop-blur-xs z-20">
        <div className="bg-white dark:bg-black w-[100%] lg:w-[30%] px-8 py-6 rounded-lg shadow-xl max-h-96 overflow-auto">
            <div className='flex justify-between items-center mb-2'>
                <div className='flex gap-2 items-center'>
                    <div>
                        <p className='text-xl font-semibold'>Who liked this post</p>
                    </div>
                </div>
                <div>
                    <div className='text-xl w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-200 duration-200'>
                        <XMarkIcon className='w-8 h-8' onClick={() => setViewLikes(null)}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 md:gap-3'>
                {
                    !loading && postLikes && postLikes.length ?
                        postLikes.map((user) => {
                            return (
                                <div key={user._id} className='flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors'>
                                    <div className='flex gap-3 md:gap-4 items-center flex-1 min-w-0'>
                                        <div className='relative flex-shrink-0'>
                                            <img 
                                                src={user.profilePictureUrl} 
                                                className='w-12 h-12 sm:w-14 sm:h-14 border-2 border-white rounded-full object-cover'
                                                alt={`${user.name}'s profile`}
                                            />
                                            <HeartIcon className='w-4 h-4 sm:w-5 sm:h-5 text-red-500 absolute bottom-[-6px] right-[-4px] sm:bottom-[-5px] sm:right-[-5px]'/>
                                        </div>
                                        <div className='min-w-0'>
                                            <Link 
                                                className='text-base sm:text-lg font-semibold hover:text-blue-500 truncate block' 
                                                to={`/user/profile/${user._id}`}
                                            >
                                                {user.name}
                                            </Link>
                                            <p className='text-sm text-gray-600 truncate'>{user.headLine}</p>
                                        </div>
                                    </div>
                                    {userData._id !== user._id && (
                                        <div className='flex-shrink-0 ml-2'>
                                            <Follow 
                                                userId={user._id} 
                                                className={'text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 sm:px-4 sm:py-2 w-[100px] sm:w-[140px] transition-colors'}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    : null
                }
            </div>
        </div>
    </div>
  )
}

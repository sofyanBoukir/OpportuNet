import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { getWhoLikedPost } from '../../services/post';
import { Follow } from '../UI/Follow';
import { Link } from 'react-router-dom';
import { AppSelector } from '../../selectors/AppSelector';

export const ViewPostLikes = ({setViewLikes,postId}) => {
    const [loading,setLoading] = useState(false);
    const [postLikes,setPostLikes] = useState([])
    const {userData} = AppSelector()

    const _getWhoLikedPost = async () =>{
        try{
            setLoading(true);
            const response = await getWhoLikedPost(localStorage.getItem('token'),postId);
            console.log(response);
            
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
    <div className="fixed inset-0 flex items-center bg-black/50 text-gray-700 justify-center backdrop-blur-xs z-20">
        <div className="bg-white w-[100%] lg:w-[30%] px-8 py-6 rounded-lg shadow-xl max-h-96 overflow-auto">
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
            <div className='flex flex-col gap-2'>
                {
                    !loading && postLikes && postLikes.length ?
                        postLikes.map((user) =>{
                            return <div className='flex justify-between items-center'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={user.profilePictureUrl} className='w-10 h-10 rounded-full'/>
                                        <div>
                                            <Link className='text-lg font-semibold hover:text-blue-500' to={`/user/profile/${user._id}`}>{user.name}</Link>
                                            <p>{user.headLine}</p>
                                        </div>
                                    </div>
                                    {userData._id !== user._id && <Follow userId={user._id} className={'bg-blue-500 text-white rounded-sm w-[140px]'}/>}
                                </div>
                        })
                    :null
                }
            </div>
        </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BookmarkIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalIcon, FlagIcon, LinkIcon } from '@heroicons/react/24/outline';
import { PostModal } from '../modals/PostModal';
import moment from 'moment/moment';
// import HeartIcon from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeart } from "@heroicons/react/16/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

import { BookmarkIcon as SolidBookMark } from "@heroicons/react/16/solid";
import { BookmarkIcon as OutlineBookMark } from "@heroicons/react/24/outline";

import { Skeleton } from '@mui/material';
import { isAlreadyLiked, toggleLike, toggleSave } from '../../services/post';
import { AppSelector } from '../../selectors/AppSelector';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const Post = ({post}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    const {userData} = AppSelector()
    console.log(userData);
    
    const [openModalPost , setOpenModalPost] =useState(false)
    const [alreadyLiked,setAlreadyLiked] = useState(userData.likedPosts.includes(post._id));    
    const [alreadySaved,setAlreadySaved] = useState(userData.savedPosts.includes(post._id));
    
    // const _alreadyLiked = async () =>{
    //     const response = await isAlreadyLiked(localStorage.getItem('token'),post._id);
    //     console.log(response);
        
    //     if(response.status === 200){
    //         if(response.data.liked){
    //             setAlreadyLiked(true)
    //         }else{
    //             setAlreadyLiked(false)
    //         }
    //     }
    // }

    const _toggleLike = async () =>{
        const response = await toggleLike(localStorage.getItem('token'),post._id);
        console.log(response);
        
        if(response.status === 200){
            if(response.data.liked === true){
                userData.likedPosts.push(post._id)
                setAlreadyLiked(true)
                post.likes.length += 1
            }
            if(response.data.liked === false){
                setAlreadyLiked(false)
                post.likes.length -= 1
                const newLikes = userData.likedPosts.filter((id) => id !== post._id);
                userData.likedPosts = newLikes
            }
        }
    }


    const _toggleSave = async () =>{
        const response = await toggleSave(localStorage.getItem('token'),post._id);
        console.log(response);
        
        if(response.status === 200){
            if(response.data.saved === true){
                userData.savedPosts.push(post._id)
                setAlreadySaved(true)
            }
            if(response.data.saved === false){
                const newSaves = userData.savedPosts.filter((id) => id !== post._id);
                userData.savedPosts = newSaves
                setAlreadySaved(false)
            }
        }
    }
  return (
    <div className='w-[100%] md:w-[100%] bg-white rounded-xl'>
        <div className='w-[100%] px-4 py-4 justify-between flex flex-row items-center'>
            <div className=' flex flex-row items-center'>
                <div className='w-[15%] lg:w-[12%]'> <img src={serverUrl + post.user?.profile_picture} className=' rounded-full' alt="" /></div>
                <div className='px-3'>
                    <div className='flex flex-row items-center'>
                        <h1 className='text-xl font-semibold'>{post.user?.name}</h1>
                        <h3 className='text-gray-400 text-sm font-semibold px-2'>{moment(post.createdAt).fromNow()}</h3>
                    </div>
                    <div>
                        <h1 className='text-gray-400 text-lg font-semibold'>{post.user?.headLine}</h1>
                    </div>
                </div>
            </div>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}    
                >
                    <EllipsisHorizontalIcon className='text-black w-10'/>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    
                    <MenuItem onClick={handleClose}><div className='flex flex-row items-center gap-2'>
                        <FlagIcon className='text-black w-6 h-6' strokeWidth={1.2}/><h1>Report</h1></div>
                    </MenuItem><MenuItem onClick={handleClose}><div className='flex flex-row items-center gap-2'>
                        <LinkIcon className='text-black w-6 h-6' strokeWidth={1.2}/><h1>Coppy Link</h1></div>
                    </MenuItem>
                    
                </Menu>
            </div>
        </div>
        <div>
            <div className="text-gray-800 px-4 py-2 text-xl lexend-deca">
                {post.content.length > 100 ? (
                    <>
                    <span>{isExpanded ? post.content : post.content.slice(0, 100) + "..."}</span>
                    <button
                        onClick={toggleText}
                        className="text-gray-700 underline text-sm ml-2 cursor-pointer"
                    >
                        {isExpanded ? "See Less" : "See More"}
                    </button>
                    </>
                ) : (
                    <span>{post.content}</span>
                )}
            </div>
            <div className='w-[100%] mt-1'>
                <img src={serverUrl + post.image} className='w-[100%]' alt="" />
            </div>
            <div className='px-4 py-3 flex flex-row justify-between'>
                <h1>{post.likes.length} Likes</h1>
                <h1>{post.comments.length} comments</h1>
            </div>
            <hr  className='w-[95%] py-1 text-gray-200 mx-auto'/>
            <div className='flex flex-row items-center py-2 px-5  justify-center'>
                <button onClick={_toggleLike} className='flex flex-row items-center w-[30%] hover:bg-gray-100 justify-center py-2 rounded-lg cursor-pointer duration-200'><div className='flex flex-row items-center gap-2'>
                    {
                        alreadyLiked ? <SolidHeart className='w-6 h-6 text-red-600'/> : <OutlineHeart className='w-6 h-6 text-black'/>
                    } <h1>Like</h1></div>
                </button>
                <button className='flex flex-row items-center w-[30%] hover:bg-gray-100 justify-center py-2 rounded-lg cursor-pointer duration-200' onClick={()=>setOpenModalPost(true)}><div className='flex flex-row items-center gap-2'>
                    <ChatBubbleBottomCenterIcon className='text-black w-6 h-6'/><h1>Comment</h1></div>
                </button>
                <button onClick={_toggleSave} className='flex flex-row items-center w-[30%] hover:bg-gray-100 justify-center py-2 rounded-lg cursor-pointer duration-200'><div className='flex flex-row items-center gap-2'>
                    {
                        alreadySaved ? <SolidBookMark className='text-black w-6 h-6'/> : <OutlineBookMark className='text-black w-6 h-6'/>
                    }
                    <h1>Save</h1></div>
                </button>
            </div>
        </div>
        {openModalPost && <PostModal setOpenModalPost={setOpenModalPost} post={post}/>}
    </div>
    
  )
}

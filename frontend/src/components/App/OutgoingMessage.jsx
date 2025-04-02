import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Button, Menu, MenuItem } from '@mui/material';
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const OutgoingMessage = ({message,deleteMessage}) => {
    const post = message.post;
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      
  return (
    <div className="bg-blue-500 relative text-white flex self-end max-w-[70%] rounded-br-none px-6 py-2 rounded-3xl break-words">
        <span className="font-semibold break-words">
            {message.message}
            {post && <div onClick={() => navigate(`/post/${post._id}`)} className='cursor-pointer'>
                    <div className='flex gap-2 items-center'>
                        <img src={post.user.profilePictureUrl} className='w-10 h-10 rounded-full'/>
                        <div>
                            <p className='text-xl'>{post.user.name}</p>   
                            <span>{post.user.headLine}</span>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <img src={post.imageUrl}/>
                        <span>{post.content}</span>
                    </div>
                </div>}
                <br></br>
            <div className='flex gap-2 items-center float-right relative'>
                <span className='text-gray-800'>{moment(message.createdAt).format('LT')}</span>
            </div>
        </span>

        <div>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <EllipsisVerticalIcon className="text-black w-8 dark:text-white" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                    handleClose();
                    }}
                >
                    <div className="flex flex-row items-center gap-2" onClick={() => deleteMessage(message)}>
                        <h1>Delete</h1>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    </div>
)
}

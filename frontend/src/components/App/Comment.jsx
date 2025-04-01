import {  EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Menu, MenuItem } from '@mui/material';
import moment from 'moment';
import React from 'react'
import { AppSelector } from '../../selectors/AppSelector';
import { Link } from 'react-router-dom';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const Comment = ({comment,deleteComment}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {userData} = AppSelector();
    
  return (
    <div className="flex flex-row items-start w-[100%] mt-2 gap-2">
        <div className="w-8 lg:w-8">
            <img
            src={comment.user.profilePictureUrl}
            className="rounded-full w-10 h-8 object-cover"
            />
        </div>
        <div className="w-auto rounded-tl-none bg-gray-200 dark:bg-gray-800 rounded-2xl px-3 py-2">
            <Link className="text-xl font-semibold hover:text-blue-700 duration-200" to={`/user/profile/${comment.user._id}`}>{comment.user.name}</Link> <span className="text-gray-500 text-sm">{moment(comment.createdAt).fromNow()}</span>
            <p>{comment.comment}</p>
        </div>
        {
          userData._id === comment.user._id && (
            <div>
              <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}    
              >
                  <EllipsisVerticalIcon className='text-gray-700 dark:text-gray-200 w-7 px-0'/>
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
                  
                  <MenuItem onClick={handleClose}><div className='flex flex-row items-center gap-2' onClick={()=>deleteComment(comment.post,comment._id)}>
                      <TrashIcon className='text-black w-6 h-6' strokeWidth={1}/><h1>Delete</h1></div>
                  </MenuItem>
              </Menu>
            </div>
          )
        }
    </div> 
  )
}

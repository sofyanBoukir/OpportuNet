import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
  LinkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PostModal } from "../modals/PostModal";
import moment from "moment/moment";
// import HeartIcon from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeart } from "@heroicons/react/16/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

import { BookmarkIcon as SolidBookMark } from "@heroicons/react/16/solid";
import { BookmarkIcon as OutlineBookMark } from "@heroicons/react/24/outline";
import { FiSend } from "react-icons/fi";
import { markPostAsSeen, toggleLike, toggleSave } from "../../services/post";
import { AppSelector } from "../../selectors/AppSelector";
import { Link } from "react-router-dom";
import { copyText } from "../../functions/copyText";
import { Notification } from "../UI/Notification";
import { ViewPostLikes } from "../modals/ViewPostLikes";
import { SharePost } from "../modals/SharePost";
import { Follow } from "../UI/Follow";
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

export const Post = ({ post, showIcon, postSelected, openDelete }) => {
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

  const { userData } = AppSelector();

  const [openModalPost, setOpenModalPost] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(
    userData.likedPosts.includes(post._id)
  );
  const [alreadySaved, setAlreadySaved] = useState(
    userData.savedPosts.includes(post._id)
  );
  const [notification, setNotification] = useState();
  const [viewLikes,setViewLikes] = useState(false);
  const [sharePost,setSharePost] = useState(false);
  const seenPosts = JSON.parse(localStorage.getItem('seenPosts')) || []; 

  const _toggleLike = async () => {
    const response = await toggleLike(localStorage.getItem("token"), post._id);

    if (response.status === 200) {
      if (response.data.liked === true) {
        userData.likedPosts.push(post._id);
        setAlreadyLiked(true);
        post.likes.length += 1;
      }
      if (response.data.liked === false) {
        setAlreadyLiked(false);
        post.likes.length -= 1;
        const newLikes = userData.likedPosts.filter((id) => id !== post._id);
        userData.likedPosts = newLikes;
      }
    }
  };

  const _toggleSave = async () => {
    const response = await toggleSave(localStorage.getItem("token"), post._id);

    if (response.status === 200) {
      if (response.data.saved === true) {
        const updatedSavedPosts = [...userData.savedPosts, post._id];
        userData.savedPosts = updatedSavedPosts;
        setAlreadySaved(true);
      }
      if (response.data.saved === false) {
        const updatedSavedPosts = userData.savedPosts.filter(
          (id) => id !== post._id
        );
        userData.savedPosts = updatedSavedPosts;
        setAlreadySaved(false);
      }
    }
  };

  useEffect(() =>{
    if(!seenPosts.includes(post._id)){
      const updateSeenPosts = [...seenPosts,post._id];
      localStorage.setItem('seenPosts',JSON.stringify(updateSeenPosts));
    }
    if(seenPosts.includes(post._id)){
      return null
    }
  },[post._id])

  return (
    <div className="w-[100%] md:w-[100%] dark:bg-black bg-white rounded-xl">
      <div className="w-[100%] px-4 py-4 justify-between flex flex-row items-center">
        <div className=" flex flex-row items-center">
          <div>
            {" "}
            <img
              src={post.user?.profilePictureUrl}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />
          </div>
          <div className="px-3">
            <div className="flex flex-row items-center">
              <Link
                className="text-xl font-semibold dark:text-white"
                to={`/user/profile/${post.user?._id}`}
              >
                {post.user?.name}
              </Link>
              <h3 className="text-gray-400 text-sm font-semibold px-2">
                {moment(post.createdAt).fromNow()}
              </h3>
            </div>
            <div>
              <h1 className="text-gray-400 text-lg font-semibold">
                {post.user?.headLine}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {
          userData?._id !== post?.user?._id && !userData?.following?.includes(post?.user?._id) && <Follow userId={post.user._id} className={'border-3 rounded-md px-3 py-2'}/>
          }
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <EllipsisHorizontalIcon className="text-black w-10 dark:text-white" />
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
            {showIcon ? (
              <MenuItem
                onClick={() => {
                  handleClose();
                  postSelected(post._id);
                  openDelete(true);
                }}
              >
                <div className="flex flex-row items-center gap-2">
                  <TrashIcon className="text-black w-6 h-6" strokeWidth={1.2} />
                  <h1>Delete</h1>
                </div>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClose}>
                <div className="flex flex-row items-center gap-2">
                  <FlagIcon className="text-black w-6 h-6" strokeWidth={1.2} />
                  <h1>Report</h1>
                </div>
              </MenuItem>
            )}
            <MenuItem onClick={handleClose}>
              <div
                className="flex flex-row items-center gap-2"
                onClick={() =>
                  copyText(frontendUrl + "/post/" + post._id, setNotification)
                }
              >
                <LinkIcon className="text-black w-6 h-6" strokeWidth={1.2} />
                <h1>Coppy Link</h1>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div>
        <div className="text-gray-800 dark:text-white px-4 py-2 text-xl lexend-deca">
          {post.content.length > 100 ? (
            <>
              <span>
                {isExpanded ? post.content : post.content.slice(0, 100) + "..."}
              </span>
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
        <div className="w-[100%] mt-1">
          <img src={post.imageUrl} className="w-[100%]" alt="" />
        </div>
        <div className="px-4 py-3 flex flex-row justify-between">
          <h1 className="dark:text-white hover:text-blue-700 hover:underline duration-200 cursor-pointer" onClick={() => setViewLikes(true)}>{post.likes.length} Likes</h1>
          <h1 className="dark:text-white hover:text-blue-700 hover:underline duration-200 cursor-pointer" onClick={() => setOpenModalPost(true)}>{post.comments.length} comments</h1>
        </div>
        <hr className="w-[95%] py-1 text-gray-200 mx-auto" />
        <div className="flex flex-row items-center py-2 px-5  justify-center">
          <button
            onClick={_toggleLike}
            className="flex flex-row items-center w-[30%] hover:bg-gray-100 dark:hover:bg-gray-900 justify-center py-2 rounded-lg cursor-pointer duration-200"
          >
            <div className="flex flex-row items-center gap-2">
              {alreadyLiked ? (
                <SolidHeart className="w-6 h-6 text-red-600" />
              ) : (
                <OutlineHeart className="w-6 h-6 text-black dark:text-white" />
              )}{" "}
              <h1 className="dark:text-white">Like</h1>
            </div>
          </button>
          <button
            className="flex flex-row items-center w-[30%] hover:bg-gray-100 dark:hover:bg-gray-900 justify-center py-2 rounded-lg cursor-pointer duration-200"
            onClick={() => setOpenModalPost(true)}
          >
            <div className="flex flex-row items-center gap-2">
              <ChatBubbleBottomCenterIcon className="text-black w-6 h-6 dark:text-white" />
              <h1 className="dark:text-white">Comment</h1>
            </div>
          </button>
          <button
            onClick={_toggleSave}
            className="flex flex-row items-center w-[30%] hover:bg-gray-100 dark:hover:bg-gray-900 justify-center py-2 rounded-lg cursor-pointer duration-200"
          >
            <div className="flex flex-row items-center gap-2">
              {alreadySaved ? (
                <SolidBookMark className="text-black w-6 h-6 dark:text-white" />
              ) : (
                <OutlineBookMark className="text-black w-6 h-6 dark:text-white" />
              )}
              <h1 className="dark:text-white">Save</h1>
            </div>
          </button>

          <button
            onClick={() => setSharePost(true)}
            className="flex flex-row items-center w-[30%] hover:bg-gray-100 dark:hover:bg-gray-900 justify-center py-2 rounded-lg cursor-pointer duration-200"
          >
            <div className="flex flex-row items-center gap-2">
              <FiSend className="w-6 h-6 text-black dark:text-white" strokeWidth={1.4} />
              <h1 className="dark:text-white">Share</h1>
            </div>
          </button>
        </div>
      </div>
      {openModalPost && (
        <PostModal setOpenModalPost={setOpenModalPost} post={post} />
      )}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {
        viewLikes && <ViewPostLikes setViewLikes={setViewLikes} postId={post._id}/>
      }
      {
        sharePost && <SharePost postId={post._id} setSharePost={setSharePost}/>
      }
    </div>
  );
};

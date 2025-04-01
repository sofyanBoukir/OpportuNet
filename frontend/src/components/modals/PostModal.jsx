import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { commentOnPost, deleteComment, getPostComments } from "../../services/comment";
import { Comment } from "../App/Comment";
import { LinearProgress } from "@mui/material";
import { AppSelector } from "../../selectors/AppSelector";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const PostModal = ({setOpenModalPost,post}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => setIsExpanded(!isExpanded);

  const {userData} = AppSelector()
  const [comment,setComment] = useState('');
  const [loading,setLoading] = useState(true);
  const [comments,setComments] = useState([]);
  const [page,setPage] = useState(1);
  const [errMessage,setErrorMessage] = useState('')
  const [commentLoading,setCommentLoading] = useState(false)
  const loadingRef = useRef(false)
  const [commentMessage,setCommentMessage] = useState('')

  
  const _getPostComments = async () =>{
    if(loadingRef.current) return;
    loadingRef.current = true
    const response = await getPostComments(localStorage.getItem('token'),post._id,page)
    setComments((prevComments) => [...prevComments, ...response.data.comments])
    if(response.data.comments.length === 0 && comments.length === 0){
      setCommentMessage('Be the first to comment on this post')
    }
    setLoading(false)
    loadingRef.current = false
  }

  const _commentOnPost = async () =>{
    try{
      setCommentLoading(true)
      const response = await commentOnPost(localStorage.getItem('token'),post._id,comment);
      console.log(response);
      
      setCommentLoading(false);
      if(response.status === 200){
        post.comments.length += 1
        setComments((prevComments) => [{user:{
          name:userData.name,
          profilePictureUrl:userData.profilePictureUrl,
          _id:userData._id
        },
          comment:comment,
          createdAt:new Date()},...prevComments])
          setCommentMessage('')
        setComment('')
      }
    }catch(err){
      setLoading(false)
      switch(err.response.status){
          case 401:
              setErrorMessage(err.response.data.message)
              break
          case 500:
              setErrorMessage(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
              break
      }
    }
  }


  const _deleteComment = async (postId,commentId) =>{
    const response = await deleteComment(localStorage.getItem('token'),postId,commentId);
    if(response.status === 200){
      if(response.data.deleted){
        const newComments = comments.filter((comment) => comment._id !== commentId);
        setComments(newComments);
        post.comments.length -= 1
      }
    }
  }

  useEffect(() =>{
    _getPostComments()
  },[page])
  return (
    <div className="fixed inset-0 z-20 flex w-[100%] items-center bg-black/50 justify-center h-screen dark:text-gray-200 text-gray-700 backdrop-blur-xs">
      <div className="bg-white dark:bg-black lg:w-[50%] w-[90%] px-1 py-6 rounded-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold px-2">{post.user.name}'s Post</h1>
          <div className="text-xl w-10 h-10 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-200 duration-200">
            <XMarkIcon className="w-8 h-8" onClick={() => setOpenModalPost(false)}/>
          </div>
        </div>
        <hr className="mt-5 text-gray-200"/>
        <div className="flex-1 overflow-auto">
          <div className="w-full px-4 py-4 flex items-center">
            <img src={post.user.profilePictureUrl} className="w-12 h-12 rounded-full" alt="" />
            <div className="px-3">
              <h1 className="text-xl font-semibold">{post.user.name}</h1>
              <h3 className="text-gray-400 font-semibold text-sm">
                {post.user.headLine}
              </h3>
            </div>
          </div>

          <div className="text-gray-800 dark:text-gray-300 px-4 py-2 text-xl">
              {post.content.length > 100 ? (
                  <>
                  <span>{isExpanded ? post.content : post.content.slice(0, 100) + "..."}</span>
                  <button
                      onClick={toggleText}
                      className="text-gray-700 dark:text-gray-200 underline text-sm ml-2 cursor-pointer"
                  >
                      {isExpanded ? "See Less" : "See More"}
                  </button>
                  </>
              ) : (
                  <span>{post.content}</span>
              )}
          </div>

          <div className="w-full mt-1">
            <img src={serverUrl + post.image} className="w-full" alt="" />
          </div>

          <div className="px-4 py-3 flex justify-between">
            <h1>{post.likes.length} Likes</h1>
            <h1>{post.comments.length} Comments</h1>
          </div>
          <hr className="w-[95%] py-1 text-gray-200 mx-auto" />

          <div className="px-4 py-2">
            {
              loading && <LinearProgress />
            }
            {
              !loading && comments && comments.length ?
                comments.map((comment) =>{
                  return <Comment comment={comment} deleteComment={_deleteComment}/>
                })
              :null
            }
            {
              comments.length >= 5 && <span onClick={() => setPage(page+1)} className="font-semibold flex justify-center mt-1 cursor-pointer underline text-blue-900">View more comments</span>
            }
          </div>
          {
            commentMessage && <span className="text-xl font-semibold flex justify-center my-4">{commentMessage}</span>
          }
        </div>

        <div className="sticky bottom-0 left-0 flex items-center w-full py-2 gap-2 bg-white dark:bg-black">
          <img
            src={serverUrl+userData.profile_picture}
            className="w-10 h-10 rounded-full object-cover"
          />
          <Input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={200}
            placeholder="Write a comment... max 200 chars"
            className="bg-gray-200 w-full py-4 px-2 rounded-2xl outline-none"
          />
          <Button text={'Comment'} className={'bg-blue-500 text-white'} onClick={_commentOnPost} loading={commentLoading}/>
        </div>
      </div>
    </div>
  );
};

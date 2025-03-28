import React, { useEffect, useState } from "react";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { PostSkeleton } from "../components/skeletons/PostSkeleton";
import { Post } from "../components/App/Post";
import { getPost } from "../services/post";
import { useNavigate, useParams } from "react-router-dom";

export const PostId = () => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();
  const getPostById = async (postId) => {
    try{
      const response = await getPost(localStorage.getItem("token"), postId);
      console.log(response);
      if (response.data.post) {
        setLoading(false);
        setPostData(response.data.post);
      } else {
        navigate("/notFound");
      }
    }catch(err){
      navigate('/notFound')
    }
  };
  useEffect(() => {
    if (postId) {
      getPostById(postId);
    } else {
      navigate("/notFound");
    }
  }, [postId]);
  return (
    <div className="px-[10%] relative top-16">
      <div className="flex justify-center gap-[1%]">
        <ProfileStatus />
        <div className="flex flex-col gap-2 w-[100%] lg:w-[43%]  lg:relative">
          {loading && <PostSkeleton />}
          {!loading && postData ? <Post post={postData} /> : null}
        </div>
      </div>
    </div>
  );
};

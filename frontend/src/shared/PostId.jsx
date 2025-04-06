import React, { useEffect, useState } from "react";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { PostSkeleton } from "../components/skeletons/PostSkeleton";
import { Post } from "../components/App/Post";
import { getPost } from "../services/post";
import { useNavigate, useParams } from "react-router-dom";
import { AppSelector } from "../selectors/AppSelector";

export const PostId = () => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();
  const { userData } = AppSelector();
  const getPostById = async (postId) => {
    try {
      const response = await getPost(localStorage.getItem("token"), postId);
      if (response.data.post) {
        setLoading(false);
        setPostData(response.data.post);
      } else {
        navigate("/notFound");
      }
    } catch (err) {
      navigate("/notFound");
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
        {userData.role !== "admin" && <ProfileStatus />}
        <div
          className={`flex flex-col gap-2 w-[100%] ${
            userData.role !== "admin" ? "lg:w-[43%]" : "lg:w-[80%]"
          }  lg:relative`}
        >
          {loading && <PostSkeleton />}
          {!loading && postData ? <Post post={postData} /> : null}
        </div>
      </div>
    </div>
  );
};

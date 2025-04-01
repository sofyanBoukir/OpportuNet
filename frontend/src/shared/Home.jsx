import React, { useEffect, useRef, useState } from "react";
import { Post } from "../components/App/Post";
import userDefaultImage from "../../public/images/profilDefault.png";
import { Input } from "../components/UI/Input";
import { Profile } from "../components/App/Profile";
import { AppSelector } from "../selectors/AppSelector";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { SuggestionsModal } from "../components/App/Suggestions";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { AddPost } from "../components/modals/AddPost";
import { ERROR_MESSAGES } from "../constants/Errors";
import { getFeed } from "../services/home";
import { PostSkeleton } from "../components/skeletons/PostSkeleton";

export const Home = () => {
  const [addPost, setAddPost] = useState(false);
  const [feedPosts, setFeedPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const seenPosts = JSON.parse(localStorage.getItem('seenPosts')) || []; 
  const [unseenPosts,setUnseenPosts] = useState([]);

  const _getFeed = async () => {
    try {
      if (loadingRef.current) return;
      loadingRef.current = true;
      const response = await getFeed(localStorage.getItem("token"), page);
      loadingRef.current = false;
      
      setLoading(false);  

      if (response.status === 200) {
        if (response.data.posts) {
          setFeedPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
        }
      }
    } catch (err) {
      setLoading(false);
      switch (err.response.status) {
        case 401:
          setError(err.response.data.message);
          break;
        case 500:
          setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
          break;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    _getFeed();
  }, [page]);

  const { userData } = AppSelector();
  return (
    <div className="md:px-[8%] relative top-16">
      <div className="flex justify-center gap-[1%]">
        <ProfileStatus />
        <div className="flex flex-col gap-2 w-[100%] lg:w-[43%] left-[13%] lg:relative">
          <div className="bg-white dark:bg-black px-4 py-2 rounded-xl flex gap-2">
            <img
              src={userData.profilePictureUrl}
              className="rounded-full w-12 h-12 object-cover"
            />

            <Input
              type={"text"}
              onClick={() => setAddPost(true)}
              placeholder={"Start a post"}
              className={
                "font-semibold w-[100%] border-1 border-gray-400 dark:text-white outline-none cursor-pointer dark:bg-[#0D1117] bg-[#F4F2EE] px-3 py-1 rounded-full"
              }
            />
          </div>
          {loading && <PostSkeleton />}
          {feedPosts && !loading && feedPosts.length
            ? feedPosts.map((post,index) => {
                return <Post key={index} post={post} />;
              })
            : null}
          {!loading && feedPosts.length === 0 && (
            <span className="text-xl font-semibold">
              Try to post new posts on diff accounts
            </span>
          )}
        </div>

        <div className="hidden lg:block left-[14%] lg:relative lg:w-[26%]">
          <div></div>
          <SuggestionsModal />
        </div>
      </div>
      {addPost && <AddPost setAddPost={setAddPost} />}
    </div>
  );
};

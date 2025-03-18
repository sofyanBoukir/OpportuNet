import React, { useEffect, useRef, useState } from "react";
import { Post } from "../components/App/Post";
import userDefaultImage from '../../public/images/profilDefault.png'
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
const authService = import.meta.env.VITE_SERVER_URL;

export const Home = () => {
  const [addPost,setAddPost] = useState(false);

  const [feedPosts,setFeedPosts] = useState([])
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)

  const loadingRef = useRef(false)
  const _getFeed = async () =>{
    try{
      if(loadingRef.current) return;
      loadingRef.current = true
      const response = await getFeed(localStorage.getItem('token'),page);
      loadingRef.current = false

      setTimeout(() => {
        setLoading(false)
      }, 3000);
      console.log(response);
      
      if(response.status === 200){
        if(response.data.posts){
          console.log(response.data.posts);
          setFeedPosts((prevPosts) => [...prevPosts,...response.data.posts])
        }
      }

    }catch(err){
      setLoading(false)
      switch(err.response.status){
          case 401:
              setError(err.response.data.message)
              break
          case 500:
              setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
              break
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    _getFeed();
  }, [page]);


  const suggestions = [
      { sugName: "Ayoub Mhainid", sugHead: "UI/UX designer" },
      { sugName: "Soufiane Boukir", sugHead: "Go developer" },
      { sugName: "Said kachoud", sugHead: "PHP developer" },
    ]
  const {userData} = AppSelector()
  return (
    <div className="px-[10%] relative top-16">
      <div className="flex justify-center gap-[1%]">
        <ProfileStatus />
        <div className="flex flex-col gap-2 w-[100%] lg:w-[43%] left-[13%] lg:relative">
          <div className="bg-white px-4 py-2 rounded-xl flex gap-2">
          <img src={`${authService}` + userData.profile_picture} className="rounded-full w-12 h-12"/>
            
            <Input type={'text'} onClick={()=> setAddPost(true)} placeholder={'Start a post'} className={'font-semibold w-[100%] border-1 border-gray-400 outline-none cursor-pointer bg-[#F4F2EE] px-3 py-1 rounded-full'} />
          </div>
          {
            loading && <PostSkeleton />
          }
          {
            feedPosts && !loading && feedPosts.length ?
              feedPosts.map((post) =>{
                return <Post post={post} />
              })
            :null
          }
          {
            !loading && feedPosts.length === 0 && <span className="text-xl font-semibold">Try to post new posts on diff accounts</span>
          }
        </div>

        <div className="hidden lg:block left-[13%] lg:relative lg:w-[25%]">
          <div></div>
          <SuggestionsModal suggestionList={suggestions}/>
        </div>
      </div>
      {
        addPost && <AddPost setAddPost={setAddPost} />
      }
    </div>
  );
};

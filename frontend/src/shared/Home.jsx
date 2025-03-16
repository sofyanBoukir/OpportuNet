import React, { useState } from "react";
import { Post } from "../components/App/Post";
import userDefaultImage from '../../public/images/profilDefault.png'
import { Input } from "../components/UI/Input";
import { Profile } from "../components/App/Profile";
import { AppSelector } from "../selectors/AppSelector";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { SuggestionsModal } from "../components/App/Suggestions";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { AddPost } from "../components/modals/AddPost";
const authService = import.meta.env.VITE_USER_SERVICE;

export const Home = () => {
  const [addPost,setAddPost] = useState(false);

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
          <Post />
          <Post />
          <Post />
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

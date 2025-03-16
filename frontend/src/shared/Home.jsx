import React from "react";
import { Post } from "../components/App/Post";
import userDefaultImage from '../../public/images/profilDefault.png'
import { Input } from "../components/UI/Input";
import { Profile } from "../components/App/Profile";
import { AppSelector } from "../selectors/AppSelector";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { SuggestionsModal } from "../components/App/Suggestions";
export const Home = () => {

  const suggestions = [
      { sugName: "Ayoub Mhainid", sugHead: "UI/UX designer" },
      { sugName: "Soufiane Boukir", sugHead: "Go developer" },
      { sugName: "Said kachoud", sugHead: "PHP developer" },
    ]
  const {userData} = AppSelector()
  return (
    <div className="px-[10%] relative top-16">
      <div className="flex justify-center gap-[1%]">
        <div className="w-[20%] hidden flex-col left-[12%] fixed lg:flex">
          <div>
            <Profile />
          </div>
          <div className="bg-white rounded-xl mt-2 flex justify-center gap-5 py-2">
            <div className="text-center hover:bg-gray-50 duration-200 p-1 cursor-pointer">
              <p className="font-semibold text-xl">100</p>
              <span>Followers</span>
            </div>
            <div className="text-center hover:bg-gray-50 duration-200 p-1 cursor-pointer">
              <p className="font-semibold text-xl">100</p>
              <span>Followings</span>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col gap-2 w-[100%] lg:w-[43%] left-[13%] lg:relative">
          <div className="bg-white px-4 py-2 rounded-xl flex gap-2">
            <img src={userDefaultImage} className="rounded-full w-12 h-12"/>
            <Input type={'text'} placeholder={'Start a post'} className={'font-semibold w-[100%] border-1 border-gray-400 outline-none cursor-pointer bg-[#F4F2EE] px-3 py-1 rounded-full'} />
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
    </div>
  );
};

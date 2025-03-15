import React from "react";
import { useSelector } from "react-redux";
import { Post } from "../components/App/Post";
import userDefaultImage from '../../public/images/profilDefault.png'
import { Input } from "../components/UI/Input";
export const Home = () => {
  const appStore = useSelector((data) => data);
  return (
    <div className="px-[12%] relative top-16">
      <div className="flex justify-center gap-[1%]">
        <div className="w-[20%]">
          <div>Profile component</div>
          <div></div>
        </div>

        <div className="flex flex-col gap-2 w-[50%]">
          <div className="bg-white px-4 py-2 rounded-xl flex gap-2">
            <img src={userDefaultImage} className="rounded-full w-12 h-12"/>
            <Input type={'text'} placeholder={'Start a post'} className={'font-semibold w-[100%] border-1 border-gray-400 outline-none cursor-pointer bg-[#F4F2EE] px-3 py-1 rounded-full'} />
          </div> 
          <Post />
          <Post />
          <Post />
        </div>

        <div className="w-[20%]">
          <div>Suggesstions</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

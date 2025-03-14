import React from "react";
import { useSelector } from "react-redux";
import { Post } from "../components/App/Post";

export const Home = () => {
  const appStore = useSelector((data) => data);
  return (
    <div className="h-[100px] w-full relative top-[50px] left-0">
      <div className="w-full absolute top-0 left-0 flex justify-center flex-col">
        {/* <h1 className="text-xl font-semibold">Welcome <span className="text-blue-500">{appStore.userData.name}</span></h1> */}
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

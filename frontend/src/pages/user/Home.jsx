import React from "react";
import { useSelector } from "react-redux";
import { Post } from "../../components/App/Post";

export const Home = () => {
  const appStore = useSelector(data => data)
  return (
    <div className="mt-2 flex justify-center flex-col">
      {/* <h1 className="text-xl font-semibold">Welcome <span className="text-blue-500">{appStore.userData.name}</span></h1> */}
      <Post />
      <Post />
      <Post />
    </div>
  );
};

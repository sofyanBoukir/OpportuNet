import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const appStore = useSelector(data => data)
  return (
    <div className="mt-10 flex justify-center">
      <h1 className="text-xl font-semibold">Welcome <span className="text-blue-500">{appStore.userData.name}</span></h1>
    </div>
  );
};

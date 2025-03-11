import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { SingleLink } from "../components/UI/SingleLink";
import { Input } from "../components/UI/Input";
import { dataHeader } from "../constants/Links";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [showProfil, setShowProfil] = useState(false);

  const isMessaged = false;
  const isNotified = true;

  const showProfil_FUNCTION = () => {
    showProfil === false ? setShowProfil(true) : setShowProfil(false);
  };

  const role = "condidate";
  return (
    <div>
      <header className="fixed top-0 w-[100vw] z-20 h-[50px] bord)er bor)der-red-500 bg-[#FFFFFF] flex sm:justify-center justify-around ">
        <div className="bg-a)mber-900 w-[10%] mx-1 my-auto sm:flex sm:w-[25%] sm:h-full">
          <img
            src="../../public/images/scren.png"
            alt="logo"
            className="sm:w-[50px] sm:h-[70%] sm:my-auto sm:mr-1"
          />
          <Input
            placeholder="Search"
            className="hidden sm:block pl-[35px] h-[70%] w-[70%] my-auto bg-[#7a6946]"
          />
        </div>
        <div className="w-[90%] flex justify-around items-center sm:justify-evenly sm:w-[33%] bg-am)ber-200 ">
          <div className="w-[60px] flex justify-center mt-[3px] sm:absolute sm:left-[365px] ">
            <MagnifyingGlassIcon strokeWidth="1" className="w-6 h-6" />
          </div>
          {dataHeader.map((element) => (
            <SingleLink
              key={element.LINK}
              link={element.LINK}
              svg={element.SVG}
              text={element.TEXT}
            />
          ))}
          <div
            className={`w-[60px] ${
              showProfil && "sm:border-b-2"
            } flex flex-col items-center justify-center mt-[3px] cursor-pointer hover:text-blue-500`}
            onClick={showProfil_FUNCTION}
          >
            <UserIcon strokeWidth="1" className="w-6 h-6" />
            <div className="font-light hidden sm:block">Me</div>
          </div>
        </div>
        <div
          className={`${
            showProfil ? "block" : "hidden"
          } border border-gray-200 w-[270px] h-[60px] sm:h-[200px] shadow-xl absolute top-[55px] right-6 rounded-b-lg rounded-tl-lg sm:right-[380px]`}
        ></div>
        <div
          className={
            isNotified
              ? "bg-red-500 rounded w-2 h-2 absolute right-[85px] top-4 sm:right-[468px] sm:top-1"
              : "hidden"
          }
        ></div>
        <div
          className={
            isMessaged
              ? "bg-red-500 rounded w-2 h-2 absolute right-[145px] top-4 sm:right-[560px] sm:top-1"
              : "hidden"
          }
        ></div>
      </header>
      <Outlet />
    </div>
  );
};

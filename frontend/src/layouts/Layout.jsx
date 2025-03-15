import { Input } from "../components/UI/Input";
import { ArrowRightOnRectangleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SingleLink } from "../components/UI/SingleLink";
import { dataHeader } from "../constants/Links";
import { AppSelector } from "../selectors/AppSelector";
import { useEffect, useState } from "react";
import userDefaultImage from '../../public/images/profilDefault.png'
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import React from "react"
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [showProfil, setShowProfil] = useState(false);
  const { isMessaged, isNotified, userData } = AppSelector();


  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  const showProfil_FUNCTION = (e) => {
    e.stopPropagation();
    showProfil === false ? setShowProfil(true) : setShowProfil(false);
  };

  return (
    <div>
    <div>
      <div
        className="bg-white py-1 lg:px-[10%] flex w-[100%] justify-between fixed z-20" 
        onClick={() => setShowProfil(false)}
      >
        <div className="w-full lg:w-[40%] relative">
          <div
            className={`w-[60px] flex justify-center mt-[3px] absolute left-[48px] top-[12px]`}
          >
            <MagnifyingGlassIcon
              strokeWidth="2"
              className="w-5 h-5 text-gray-700"
            />
          </div>
          <div className={`w-full h-full flex items-center gap-2 p-1`}>
            <img
              src="../../public/images/scren.png"
              alt="logo"
              className="w-[50px] h-[40px]"
            />
            <Input
              placeholder="Search"
              className={`sm:block) pl-[32px] py-2 w-[90%] sm:w-[640px]) my-auto outline-none rounded-md bg-[#F2F2F2]`}
            />
          </div>
        </div>
        <div className="bg-white w-full lg:w-[50%] h-[70px] lg:h-auto fixed lg:static bottom-0 flex sm:justify-center gap-8">
          {dataHeader
            .filter((item) => item.ROLE === userData.role)
            .map((element) => (
              <SingleLink
                key={element.LINK}
                link={element.LINK}
                svg={element.SVG}
                text={element.TEXT}
              />
            ))}

          <div
            className={`w-[60px] flex flex-col items-center justify-center mt-[3px] cursor-pointer`}
            onClick={() => setDarkMode(!darkMode)} >
            {
              darkMode ? 
              <MoonIcon className="w-7 h-7 text-[#666666]"/>
              : <SunIcon className="w-7 h-7 text-[#666666]"/>
            }
            <div className="text-xs font-normal hidden lg:block text-gray-600">
            {
              darkMode ? 
                "Dark"
              : "Light"
            }
            </div>
          </div>
          <div
            className={`w-[60px] flex flex-col items-center justify-center mt-[3px] cursor-pointer`}
            onClick={showProfil_FUNCTION}
          >
            <img
              src="../../public/images/profilDefault.png"
              className="w-7 h-7 rounded-full mt-0.5"
            />
            <div className="text-xs font-normal hidden lg:block text-gray-600 2xl:block">Profile</div>
          </div>
          
        </div>
      </div>
      <div
        className={`${
          showProfil ? "block" : "hidden"
        } w-[400px] py-2 px-3 rounded-xl shadow-lg flex flex-col bg-white absolute md:left-[65%] rounded-tr-none md:top-[75px] z-15`}
      >
          <div className="flex items-center gap-2">
            <div>
              <img src={userDefaultImage} className="rounded-full w-16 h-16"/>
            </div>
            <div>
              <p className="text-lg font-semibold">Soufian boukir</p>
              <span className="text-gray-700">Javascript developer</span>
            </div>
          </div>
          <div className="mt-2">
            <button className="rounded-2xl font-semibold w-[100%] cursor-pointer border-2 border-blue-600 text-[#0A66C2] bg-gray-100 hover:bg-blue-50 duration-200">
              View profile
            </button>
          </div>
          <div className="mt-2">
            <hr className="text-gray-300"></hr>
          </div>
          <div className="mt-2 flex gap-2 flex-col">
            <div className="flex gap-2 items-center py-1 rounded-md cursor-pointer px-2 hover:bg-gray-100 duration-200">
              <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-700" strokeWidth={1.1}/>
              <span className="text-gray-700 text-lg">Sign out</span>
            </div>
          </div>
      </div>
        {/* <span
            className={
              isNotified
                ? "bg-red-500 rounded w-2 h-2 fixed bottom-7 right-[125px] sm:right-[239px] 2xl:absolute 2xl:top-[6px] 2xl:right-[183px]"
                : "hidden"
            }
          ></span>
          <span
            className={
              isMessaged
                ? "bg-red-500 rounded w-2 h-2 fixed bottom-7 right-[201px] sm:right-[373px] 2xl:top-[6px] 2xl:right-[650px]"
                : "hidden"
            }
          ></span> */}
    </div>
  <Outlet />
    </div>
  );
};

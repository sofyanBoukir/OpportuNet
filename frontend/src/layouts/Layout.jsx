import { Outlet } from "react-router-dom";
import { Input } from "../components/UI/Input";
import SearchIcon from "@mui/icons-material/Search";
import ContrastIcon from "@mui/icons-material/Contrast";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { SingleLink } from "../components/UI/SingleLink";
import { dataHeader } from "../constants/Links";
import { AppSelector } from "../selectors/AppSelector";

export const Layout = () => {
  const [showProfil, setShowProfil] = useState(false);
  const { isMessaged, isNotified, userData } = AppSelector();
  console.log("object", userData);

  const showProfil_FUNCTION = (e) => {
    e.stopPropagation();
    showProfil === false ? setShowProfil(true) : setShowProfil(false);
  };

  return (
    <div>
      <div className="h-[55px] fixed z-15 w-full hidden 2xl:block "></div>
      <div
        className="w-full h-[55px] bg-white fixed top-0 z-20"
        onClick={() => setShowProfil(false)}
      >
        <div className="w-full 2xl:w-[975px] h-[55px] 2xl:relative 2xl:left-[175px] z-20">
          <div
            className={`w-[60px] flex justify-center mt-[3px] absolute left-[48px] top-[13px]`}
          >
            <SearchIcon strokeWidth="1" className="w-10 h-10" />
          </div>
          <div className={`w-full h-full flex items-center gap-2 p-1`}>
            <img
              src="../../public/images/scren.png"
              alt="logo"
              className="w-[50px] h-[40px]"
            />
            <Input
              placeholder="Search"
              className={`sm:block pl-[32px] w-[75%] sm:w-[640px] 2xl:w-[300px] h-[70%] my-auto rounded-sm bg-gray-100`}
            />
          </div>
          <div
            className={`w-[60px] absolute left-[368px] sm:left-[700px] 2xl:left-[930px] top-2.5 2xl:top-1 flex flex-col items-center justify-center mt-[3px] cursor-pointer hover:text-blue-500`}
            onClick={showProfil_FUNCTION}
          >
            <img
              src="../../public/images/profilDefault.png"
              className="w-6 h-6 rounded-xl mt-0.5"
            />
            <div className="font-light text-sm hidden 2xl:block">Me</div>
          </div>
          <div
            className={`
                  ${showProfil ? "block" : "hidden"}
               border border-gray-200 w-[270px] h-[200px] shadow-xl absolute bg-white top-[60px] right-4 2xl:right-1 rounded-b-lg rounded-tl-lg`}
          >
            <div className="w-full flex">
              <div className="w-[30%] h-[45%] pt-1">
                <img
                  src="../../public/images/profilDefault.png"
                  className="w-[70%] h-[70%] rounded-[50%] m-auto"
                />
              </div>
              <div className="w-[70%] h-[45%] pt-1">
                <h1 className="font-semibold text-xl">Said kachoud</h1>
                <h6 className="font-normal">devloper</h6>
              </div>
              <button className="font-semibold absolute border-2 border-blue-600 text-blue-600 w-[250px] rounded-2xl top-[36%] left-[3.5%] text-center cursor-pointer hover:bg-blue-200 hover:text-blue-500 hover:border-blue-600 hover:border-3 hover:font-medium">
                view profil
              </button>
            </div>
            <hr className="absolute text-gray-300 w-[95%] left-[2.5%] top-[53%]" />
            <div className="absolute top-[55%] w-full h-[85px]">
              <div
                className="w-full h-[50%] pl-2 pt-2 cursor-pointer hover:bg-gray-100"
                // onClick={handleClickDark}
              >
                <ContrastIcon
                  strokeWidth="1"
                  className="w-6 h-6 mr-1 text-gray-700"
                />
                <span>Dark mode</span>
              </div>
              <div className="w-full h-[50%] pl-3 pt-1 cursor-pointer hover:bg-gray-100">
                <LogoutIcon
                  strokeWidth="1"
                  className="w-6 h-6 mr-1 text-gray-700"
                />
                <span>Logout</span>
              </div>
            </div>
          </div>
          <div className="w-full 2xl:w-[500px] h-[55px] bg-white flex justify-evenly 2xl:justify-around fixed bottom-0 2xl:absolute 2xl:left-[435px]  2xl:)bg-amber-100">
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
          </div>
          <span
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
          ></span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

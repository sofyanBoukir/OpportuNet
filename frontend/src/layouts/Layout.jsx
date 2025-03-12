import SearchIcon from "@mui/icons-material/Search";
import ContrastIcon from "@mui/icons-material/Contrast";
import LogoutIcon from "@mui/icons-material/Logout";
import { SingleLink } from "../components/UI/SingleLink";
import { Input } from "../components/UI/Input";
import { dataHeader } from "../constants/Links";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSelector } from "../selectors/AppSelector";

export const Layout = () => {
  const [showProfil, setShowProfil] = useState(false);

  // const [searchMobil, setSearchMobil] = useState(false);

  const { isMessaged, isNotified } = AppSelector();

  const showProfil_FUNCTION = (e) => {
    e.stopPropagation();
    showProfil === false ? setShowProfil(true) : setShowProfil(false);
  };

  return (
    <div className="relative top-0" onClick={() => setShowProfil(false)}>
      <header className="fixed top-0 w-[100vw] z-20 h-[50px] bord)er bor)der-red-500 bg-[#FFFFFF] flex sm:justify-center justify-around ">
        <div className={`w-[10%] mx-1 my-auto sm:flex sm:w-[25%] sm:h-full`}>
          <img
            src="../../public/images/scren.png"
            alt="logo"
            className="sm:w-[50px] sm:h-[70%] sm:my-auto sm:mr-1"
          />
          <Input
            placeholder="Search"
            className={`hidden sm:block pl-[35px] h-[70%] my-auto bg-gray-100`}
          />
        </div>
        <div className="w-[90%] flex justify-around items-center sm:justify-evenly sm:w-[33%] bg-am)ber-200 ">
          <div
            className={`w-[60px] flex justify-center mt-[3px] sm:absolute sm:left-[365px]`}
          >
            <SearchIcon strokeWidth="1" className="w-10 h-10" />
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
            className={`w-[60px] flex flex-col items-center justify-center mt-[3px] cursor-pointer hover:text-blue-500`}
            onClick={showProfil_FUNCTION}
          >
            <img
              src="../../public/images/profilDefault.png"
              className="w-6 h-6 rounded-xl mt-0.5"
            />
            <div className="font-light hidden sm:block">Me</div>
          </div>
        </div>
        <div
          className={`${
            showProfil ? "block" : "hidden"
          } border border-gray-200 w-[270px] h-[60px]) sm:) h-[200px] shadow-xl absolute bg-white top-[55px] right-6 rounded-b-lg rounded-tl-lg sm:right-[355px]`}
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
              <h6>devloper</h6>
            </div>
            <button className="font-semibold absolute border-2 border-blue-600 text-blue-600 w-[250px] rounded-2xl top-[36%] left-[3.5%] text-center cursor-pointer">
              view profil
            </button>
          </div>
          <hr className="absolute text-gray-300 w-[95%] left-[2.5%] top-[53%]" />
          <div className="absolute top-[55%] w-full h-[85px]">
            <div className="w-full h-[50%] pl-2 pt-2 cursor-pointer">
              <ContrastIcon
                strokeWidth="1"
                className="w-6 h-6 mr-1 text-gray-700"
              />
              <span>Dark mode</span>
            </div>
            <div className="w-full h-[50%] pl-2 pt-1 cursor-pointer">
              <LogoutIcon
                strokeWidth="1"
                className="w-6 h-6 mr-1 text-gray-700"
              />
              <span>Logout</span>
            </div>
          </div>
        </div>

        <span
          className={
            isNotified
              ? "bg-red-500 rounded w-2 h-2 absolute right-[129px] top-4 sm:right-[522px] sm:top-[6px]"
              : "hidden"
          }
        ></span>
        <span
          className={
            isMessaged
              ? "bg-red-500 rounded w-2 h-2 absolute right-[180px] top-4 sm:right-[600px] sm:top-1"
              : "hidden"
          }
        ></span>
      </header>
      <div className="absolute top-[50px] w-[100vw]">
        <Outlet />
      </div>
    </div>
  );
};

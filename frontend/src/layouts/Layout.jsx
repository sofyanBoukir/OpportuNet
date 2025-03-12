import SearchIcon from "@mui/icons-material/Search";
import ContrastIcon from "@mui/icons-material/Contrast";
import LogoutIcon from "@mui/icons-material/Logout";
import { SingleLink } from "../components/UI/SingleLink";
import { Input } from "../components/UI/Input";
import { dataHeader } from "../constants/Links";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSelector } from "../selectors/AppSelector";
import { useDispatch } from "react-redux";

export const Layout = () => {
  const [showProfil, setShowProfil] = useState(false);
  const dispatch = useDispatch();

  const { isMessaged, isNotified, userData } = AppSelector();

  const showProfil_FUNCTION = (e) => {
    e.stopPropagation();
    showProfil === false ? setShowProfil(true) : setShowProfil(false);
  };

  const handleClickDark = () => {
    console.log("object");
    dispatch({ type: "UPDATE_THEME", payload: "dark" });
  };

  return (
    <div className={`relative top-0`} onClick={() => setShowProfil(false)}>
      {/* <div className="w-[100vw]"> */}
      <header className="bg-white fixed top-0 w-[100vw] z-20 h-[50px] flex sm:justify-center justify-around ">
        <div className={`w-[10%] mx-1 my-auto sm:flex sm:w-[25%] sm:h-full`}>
          <img
            src="../../public/images/scren.png"
            alt="logo"
            className="sm:w-[50px] sm:h-[70%] sm:my-auto sm:mr-1"
          />
          <Input
            placeholder="Search"
            className={`hidden sm:block pl-[35px] w-[80%] h-[70%] my-auto bg-gray-100`}
          />
        </div>
        <div className="w-[90%] flex justify-around items-center sm:justify-evenly sm:w-[33%] bg-am)ber-200 ">
          <div
            className={`w-[60px] flex justify-center mt-[3px] sm:absolute sm:left-[365px]`}
          >
            <SearchIcon strokeWidth="1" className="w-10 h-10" />
          </div>
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
            <button className="font-semibold absolute border-2 border-blue-600 text-blue-600 w-[250px] rounded-2xl top-[36%] left-[3.5%] text-center cursor-pointer hover:bg-blue-200 hover:text-blue-500 hover:border-blue-600 hover:border-3 hover:font-medium">
              view profil
            </button>
          </div>
          <hr className="absolute text-gray-300 w-[95%] left-[2.5%] top-[53%]" />
          <div className="absolute top-[55%] w-full h-[85px]">
            <div
              className="w-full h-[50%] pl-2 pt-2 cursor-pointer hover:bg-gray-100"
              onClick={handleClickDark}
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
              ? "bg-red-500 rounded w-2 h-2 fixed right-[180px] top-4 sm:right-[585px] sm:top-1"
              : "hidden"
          }
        ></span>
      </header>
      {/* </div> */}
      {/* <div className="relative top-[50px] h-[100vh] w-full bg-[#F4F2EE] h-[100px])"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
};

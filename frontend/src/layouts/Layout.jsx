import { Input } from "../components/UI/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SingleLink } from "../components/UI/SingleLink";
import { dataHeader } from "../constants/Links";
import { AppSelector } from "../selectors/AppSelector";
import ContrastIcon from "@mui/icons-material/Contrast";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

export const Layout = () => {
  const [showProfil, setShowProfil] = useState(false);
  const { isMessaged, isNotified, userData } = AppSelector();

  const showProfil_FUNCTION = (e) => {
    e.stopPropagation();
    showProfil === false ? setShowProfil(true) : setShowProfil(false);
  };

  return (
    <div>
      <div
        className=" bg-white py-1 lg:px-[13%] flex justify-between"
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
        <div className="bg-white w-full lg:w-[50%] h-[55px] lg:h-auto fixed lg:static bottom-0 flex sm:justify-center lg:justify-start gap-5">
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
            <div className="font-light text-xs hidden 2xl:block">Me</div>
          </div>
        </div>
      </div>
      <div
        className={`${
          showProfil ? "block" : "hidden"
        } w-[300px] py-2 px-3 rounded-lg shadow-lg flex flex-col bg-white absolute 2xl:left-[58%] 2xl:top-[65px] z-15`}
      >
        <div className="flex items-center">
          <div className="w-[45%] h-[60%] pt-1">
            <img
              src="../../public/images/profilDefault.png"
              className="w-[60%] h-[60%] rounded-[50%] m-auto"
            />
          </div>
          <div className="w-[70%] h-[45%] pt-1">
            <h1 className="font-semibold text-xl">Said kachoud</h1>
            <h6 className="font-normal">devloper</h6>
          </div>
        </div>
        <button className="mx-auto mt-3 mb-2 font-semibold border-2 border-[#0A66C2] text-[#0A66C2] w-[270px] rounded-2xl text-center cursor-pointer hover:bg-sky-100 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:border-2 hover:font-medium">
          view profil
        </button>
        <hr className="text-gray-400" />
        <div className="w-full h-[85px]">
          <div
            className="w-full h-[50%] pl-2 pt-2 flex items-center cursor-pointer hover:bg-gray-100"
            // onClick={handleClickDark}
          >
            <ContrastIcon
              strokeWidth="1"
              className="w-6 h-6 mr-1 text-gray-700"
            />
            <span>Dark mode</span>
          </div>
          <div className="w-full h-[50%] pl-3 pt-1 flex items-center cursor-pointer hover:bg-gray-100">
            <LogoutIcon
              strokeWidth="1"
              className="w-6 h-6 mr-1 text-gray-700"
            />
            <span>Logout</span>
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
    </div>
  );
};

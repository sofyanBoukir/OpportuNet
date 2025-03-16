import { useState } from "react";
import coverProfil from "../../../public/images/coverProfil.png";
import ProfilImg from "../../../public/images/profilDefault.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { IoIosCamera } from "react-icons/io";

export const ProfilInfoModal = ({ setShowModal, showIcon, userData }) => {
  const styleCover = {
    backgroundImage: `url(${coverProfil})`,
    backgroundSize: "cover",
    // backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="bg-white w-full lg:w-[89%] pb-[1px] lg:ml-[15%] relative lg:rounded-md z-15">
      <div
        style={styleCover}
        className="w-full h-[120px] md:h-[160px] 2xl:h-[215px] lg:rounded-t-md"
      >
        {/* <img
      src={coverProfil}
      alt="cover profil"
      className="w-full h-full"
      /> */}
      </div>
      <div className="bg-white absolute top-18 md:top-[105px] 2xl:top-[100px] left-[5%] 2xl:left-[3%] h-[100px] 2xl:h-[155px] w-[100px] 2xl:w-[155px] rounded-[50%] p-[3px] cursor-pointer">
        <img
          src={userData.profile_picture ? ProfilImg : userData.profile_picture}
          alt="photo profil"
          className="rounded-[50%]"
        />
      </div>
      {/* <div className="absolute top-[135px] sm:top-[175px] lg:top-[220px] left-[105px] sm:left-[120px] lg:left-[150px] rounded-[100%] z-20 h-[20px] w-[20px] text-[#666666] bg-white hover:text-black hover:bg-[#d4d2d2] cursor-pointer">
        <IoIosCamera className="mx-auto mt-[1.6px]" />
      </div> */}
      {showIcon && (
        <div
          onClick={() => setShowModal(true)}
          className="float-end mt-4 mr-5 p-1.5 duration-200 text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] "
        >
          <ModeEditOutlinedIcon strokeWidth="1" />
        </div>
      )}

      <div className="mt-[70px] ml-[30px]">
        <h1 className="font-semibold text-3xl">{userData.name}</h1>
        <h6 className="font-normal text-xl text-gray-800">
          {userData.headeLine}
        </h6>
        <div className="text-gray-600">
          {userData.address ? userData.address : "lot riad nacer tiznit"}
        </div>
        <a
          href={userData.github}
          className="font-semibold text-sm cursor-pointer text-[#0A66C2] hover:underline"
        >
          {userData.github ? userData.github : "hhhhhhhhhhhhhhhhhh"}
        </a>
        <div className="flex gap-2">
          <div className="border-2 border-[#0A66C2] px-2 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer">{userData.followers ? userData.followers : "103"} followers</span>
          </div>
          <div className="border-2 border-[#0A66C2] px-2 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer">{userData.followers ? userData.followers : "22"} followings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

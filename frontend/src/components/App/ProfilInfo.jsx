import coverProfil from "../../../public/images/coverProfil.png";
import ProfilImg from "../../../public/images/profilDefault.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Follow } from "../UI/Follow";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Follows } from "../modals/Follows";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const ProfilInfoModal = ({
  setShowModalUpdate,
  valuetoUpdate,
  showIcon,
  userData,
}) => {
  const styleCover = {
    backgroundImage: `url(${coverProfil})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };  
  
  const [toView,setToView] = useState(null)
  return (
    <div className="bg-white w-full lg:w-[89%] pb-[1px] lg:ml-[15%] relative lg:rounded-md z-15">
      <div
        style={styleCover}
        className="w-full h-[120px] md:h-[160px] 2xl:h-[215px] lg:rounded-t-md"
      ></div>
      <div className="bg-white absolute top-18 md:top-[105px] 2xl:top-[100px] left-[5%] 2xl:left-[3%] h-[100px] 2xl:h-[155px] w-[100px] 2xl:w-[155px] rounded-[50%] p-[3px] cursor-pointer">
        <img
          src={`${serverURL}` + userData.profile_picture}
          alt="photo profil"
          className="w-[95px] h-[95px] 2xl:w-[150px] 2xl:h-[150px] rounded-[50%]"
        />
      </div>

      {showIcon && (
        <div
          onClick={() => {
            setShowModalUpdate(true);
            valuetoUpdate("intro");
          }}
          className="float-end mt-4 mr-5 p-1.5 duration-200 text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] "
        >
          <ModeEditOutlinedIcon strokeWidth="1" />
        </div>
      )}

      <div className="mt-[70px] ml-[30px]">
        <h1 className="font-semibold text-3xl">{userData.name}</h1>
        <h6 className="font-normal text-xl text-gray-800">
          {userData.headLine}
        </h6>
        <div className="text-gray-600">{userData.location}</div>
        <a
          href={userData.webSite}
          className="font-semibold text-sm cursor-pointer text-[#0A66C2] hover:underline"
        >
          {userData.webSite}
        </a>
        <div className="flex gap-2">
          <div className="border-2 border-[#0A66C2] px-2 py-0.5 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => setToView('followers')}>
              {userData.followers ? userData.followers?.length : "103"} followers
            </span>
          </div>
          <div className="border-2 border-[#0A66C2] px-2 py-0.5 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => setToView('following')}>
              {userData.followers ? userData.following?.length : "22"} following
            </span>
          </div>
          {!showIcon && (
            <Follow
              userId={userData._id}
              className="bg-[#0A66C2] text-white w-[15%] py-0.5 hover:bg-blue-900 px-7 rounded-full mb-2 mt-3"
            />
          )}
          {
            toView && <Follows toView={toView} setToView={setToView} />
          }
        </div>
      </div>
    </div>
  );
};

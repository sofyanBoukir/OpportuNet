import coverProfil from "../../../public/images/coverProfil.png";
import ProfilImg from "../../../public/images/profilDefault.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
// import { IoIosCamera } from "react-icons/io";
const authService = import.meta.env.VITE_USER_SERVICE;

export const ProfilInfoModal = ({
  setShowModal,
  valuetoUpdate,
  showIcon,
  userData,
}) => {
  const styleCover = {
    backgroundImage: `url(${coverProfil})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="bg-white w-full lg:w-[89%] pb-[1px] lg:ml-[15%] relative lg:rounded-md z-15">
      <div
        style={styleCover}
        className="w-full h-[120px] md:h-[160px] 2xl:h-[215px] lg:rounded-t-md"
      ></div>
      <div className="bg-white absolute top-18 md:top-[105px] 2xl:top-[100px] left-[5%] 2xl:left-[3%] h-[100px] 2xl:h-[155px] w-[100px] 2xl:w-[155px] rounded-[50%] p-[3px] cursor-pointer">
        <img
          src={`${authService}` + userData.profile_picture}
          alt="photo profil"
          className="rounded-[50%]"
        />
      </div>

      {showIcon && (
        <div
          onClick={() => {
            setShowModal(true);
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
          <div className="border-2 border-[#0A66C2] px-2 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer">
              {userData.followers ? userData.followers : "103"} followers
            </span>
          </div>
          <div className="border-2 border-[#0A66C2] px-2 rounded-full mb-2 mt-3">
            <span className="text-[#0A66C2] font-semibold cursor-pointer">
              {userData.followers ? userData.followers : "22"} followings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

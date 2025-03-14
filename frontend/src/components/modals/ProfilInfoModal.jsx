import { Link } from "react-router-dom";
import coverProfil from "../../../public/images/cover-profil.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const ProfilInfoModal = ({ dataInfo }) => {
  const styleCover = {
    backgroundImage: `url(${coverProfil})`,
    backgroundSize: "cover",
    // backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="bg-white w-full md:w-[)55%] 2xl:w-[65%] h-auto rounded-t)-lg 2xl:rounded-lg absolute top-0 2xl:top-5 left-0 2xl:left-5 z-15">
      <div
        style={styleCover}
        className="w-full h-[120px] md:h-[160px] 2xl:h-[200px] rounded-t-md"
      >
        {/* <img
      src={coverProfil}
      alt="cover profil"
      className="w-full h-full"
    /> */}
      </div>
      <div className="bg-white absolute top-18 md:top-[105px] 2xl:top-[100px] left-[5%] 2xl:left-[3%] h-[100px] 2xl:h-[155px] w-[100px] 2xl:w-[155px] rounded-[50%] p-[3px] cursor-pointer">
        <img
          src={dataInfo.profile_picture}
          alt="photo profil"
          className="rounded-[50%]"
        />
      </div>
      <div className="float-end mt-4 mr-5 w-[40px] h-[40px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
        <ModeEditOutlinedIcon strokeWidth="1" />
      </div>

      <div className="mt-[70px] ml-[30px]">
        <h1 className="font-semibold text-2xl">{dataInfo.name}</h1>
        <h6 className="font-normal text-md text-gray-700">
          {dataInfo.headLine}
        </h6>
        <div className="text-gray-500 text-sm">{dataInfo.address}</div>
        <Link
          to={dataInfo.github}
          className="font-semibold text-sm text-[#0A66C2] hover:underline"
        >
          {dataInfo.github}
        </Link>
        <div className="flex text-sm font-semibold text-[#0A66C2] mt-2 mb-4">
          <div className="mr-6 border-2 border-[#0A66C2 rounded-2xl w-[110px] text-center">
            <span className="mr-1">{dataInfo.followers}</span>followers
          </div>
          <div className="mr-6 border-2 border-[#0A66C2 rounded-2xl w-[110px] text-center">
            <span className="mr-1">{dataInfo.following}</span>following
          </div>
        </div>
      </div>
    </div>
  );
};

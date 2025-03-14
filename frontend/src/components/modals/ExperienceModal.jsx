import experienceImg from "../../../public/images/experienceDefault.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const ExperienceModal = ({ experienceInfo }) => {
  return (
    <div className="flex justify-baseline gap-2">
      <div className="w-[45px] h-[45px] mb-4 ">
        <img
          src={experienceImg}
          alt="logo education"
          className="w-full h-full"
        />
      </div>
      <div className=" w-full flex justify-between pr-2">
        <div>
          <h5 className="text-md font-semibold text-black ">
            {experienceInfo.namePost}
          </h5>
          <span className="text-md font-light text-gray-700">
            {experienceInfo.date}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="w-[25px] h-[25px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
            <ModeEditOutlinedIcon />
          </span>
          <span className="w-[25px] h-[25px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
            <DeleteOutlinedIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

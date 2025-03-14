import educationImg from "../../../public/images/educationDefault.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const EducationModal = ({ educationInfo }) => {
  return (
    <div className="flex justify-baseline gap-2">
      <div className="w-[45px] h-[45px] mb-4 ">
        <img
          src={educationImg}
          alt="logo education"
          className="w-full h-full"
        />
      </div>
      <div className=" w-full flex justify-between pr-2">
        <div>
          <h5 className="text-md font-semibold text-black ">
            {educationInfo.nameSchool}
          </h5>
          <span className="text-md font-light text-gray-700">
            {educationInfo.date}
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

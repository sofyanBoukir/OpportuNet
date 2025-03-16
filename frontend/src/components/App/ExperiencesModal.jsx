import { PlusIcon } from "@heroicons/react/24/outline";
import experienceImg from "../../../public/images/experienceDefault.png";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const ExperiencesModal = ({ showIcon, experienceList }) => {
  return (
    <div className="bg-white w-full lg:w-[89%] p-[30px] lg:ml-[15%] relative lg:rounded-md z-15">
      {showIcon && (
        <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[30px] h-[30px] text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
          <PlusIcon strokeWidth="1" />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experienceList.map((item) => (
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
                {item.namePost}
              </h5>
              <span className="text-md font-light text-gray-700">
                {item.date}
              </span>
            </div>
            {showIcon && (
              <div className="flex gap-1">
                <span className="w-[35px] h-[35px] text-center p-[1.5px] text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
                  <ModeEditOutlinedIcon />
                </span>
                <span className="w-[35px] h-[35px] text-center p-[1.5px] text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
                  <DeleteOutlinedIcon />
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

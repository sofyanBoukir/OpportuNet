import { PlusIcon } from "@heroicons/react/24/outline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import educationImage from '../../../public/images/educationImage.png'
export const EducationsModal = ({ showIcon, educationList }) => {
  return (
    <div className="bg-white w-full lg:w-[89%] flex flex-col gap-3 p-[30px] lg:ml-[15%] relative lg:rounded-md z-15">
      {showIcon && (
        <div className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 w-10 duration-200 h-10 text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
          <PlusIcon strokeWidth="1.3" />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      {educationList.map((item) => (
        <div className="flex items-center gap-3">
          <div className="mb-4 ">
            <img
              src={educationImage}
              alt="logo education"
              className="w-10 h-10"
            />
          </div>
          <div className=" w-full flex items-center justify-between pr-2">
            <div>
              <h5 className="text-xl font-semibold text-black ">
                {item.nameSchool}
              </h5>
              <p className="text-lg font-light text-gray-900">
                {item.degree}
              </p>
              <span className="text-md font-light text-gray-700">
                {item.date}
              </span>
            </div>
            {showIcon && (
              <div className="flex gap-2">
                <span className="text-center p-1.5 text-gray-600 cursor-pointer duration-200 hover:bg-gray-100 hover:text-black rounded-[50%]">
                  <ModeEditOutlinedIcon />
                </span>
                <span className="text-center p-1.5 text-gray-600 cursor-pointer duration-200 hover:bg-gray-100 hover:text-black rounded-[50%]">
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

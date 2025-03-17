import { PlusIcon } from "@heroicons/react/24/outline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import educationImage from "../../../public/images/educationImage.png";
import { AppSelector } from "../../selectors/AppSelector";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteExperience } from "../../services/profile";
import { Notification } from "../UI/Notification";
import { ERROR_MESSAGES } from "../../constants/Errors";

export const ExperiencesModal = ({ showIcon, experienceList }) => {
  const { userData } = AppSelector();
  const dispatch = useDispatch();
  // const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);

  const token = localStorage.getItem("token");

  const handleClickDelete = async (experienceId) => {
    // setErrorMessage(null);
    setNotification(null);
    try {
      const response = await deleteExperience(token, experienceId);
      const _experience = experienceList.filter(
        (item) => item._id !== experienceId
      );
      dispatch({
        type: "UPDATE_USERDATA",
        papayloady: { ...userData, experience: _experience },
      });
      setNotification({ type: "success", message: response.data.message });
    } catch (error) {
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({ type: "error", message: ERROR_MESSAGES.TRY_AGAIN });
    }
  };

  return (
    <div className="bg-white w-full lg:w-[89%] p-[30px] lg:ml-[15%] relative lg:rounded-md z-15 flex gap-3 flex-col">
      {showIcon && (
        <div className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 w-10 duration-200 h-10  text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
          <PlusIcon strokeWidth="1.3" />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>
      {experienceList.map((item) => (
        // <div className="flex justify-baseline gap-2">
        //   <div className="w-[45px] h-[45px] mb-4 ">
        //     <img
        //       src={experienceImg}
        //       alt="logo education"
        //       className="w-full h-full"
        //     />
        //   </div>
        //   <div className=" w-full flex justify-between pr-2">
        //     <div>
        //       <h5 className="text-md font-semibold text-black ">
        //         {item.namePost}
        //       </h5>
        //       <span className="text-md font-light text-gray-700">
        //         {item.date}
        //       </span>
        //     </div>
        //     {showIcon && (
        //       <div className="flex gap-1">
        //         <span className="w-[35px] h-[35px] text-center p-[1.5px] text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
        //           <ModeEditOutlinedIcon />
        //         </span>
        //         <span className="w-[35px] h-[35px] text-center p-[1.5px] text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
        //           <DeleteOutlinedIcon />
        //         </span>
        //       </div>
        //     )}
        //   </div>
        // </div>
        <div className="flex items-start gap-3">
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
                {item.namePost} - {item.companyName}
              </h5>
              <p className="text-lg font-light text-gray-900">
                {item.location}
              </p>
              <p className="text-lg font-light text-gray-900">{item.date}</p>
              <span className="text-sm font-light text-gray-900">
                {item.description}
              </span>
            </div>
            {showIcon && (
              <div className="flex gap-2">
                <span className="text-center p-1.5 text-gray-600 cursor-pointer duration-200 hover:bg-gray-100 hover:text-black rounded-[50%]">
                  <ModeEditOutlinedIcon />
                </span>
                <span
                  onClick={() => handleClickDelete(item._id)}
                  className="text-center p-1.5 text-gray-600 cursor-pointer duration-200 hover:bg-gray-100 hover:text-black rounded-[50%]"
                >
                  <DeleteOutlinedIcon />
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

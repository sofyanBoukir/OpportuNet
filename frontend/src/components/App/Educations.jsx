import { PlusIcon } from "@heroicons/react/24/outline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import educationImage from "../../../public/images/educationImage.png";
import { deleteEducation } from "../../services/profile";
import { useState } from "react";
import { AppSelector } from "../../selectors/AppSelector";
import { useDispatch } from "react-redux";
import { Notification } from "../UI/Notification";
import { ERROR_MESSAGES } from "../../constants/Errors";

export const EducationsModal = ({
  valuetoAdd,
  setShowModalAdd,
  idEduSelected,
  setShowModalUpdate,
  valuetoUpdate,
  showIcon,
  educationList,
}) => {
  const { userData } = AppSelector();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);

  const token = localStorage.getItem("token");

  const handleClickDelete = async (educationId) => {
    setNotification(null);
    try {
      const response = await deleteEducation(token, educationId);
      const _education = educationList.filter(
        (item) => item._id !== educationId
      );
      dispatch({
        type: "UPDATE_USERDATA",
        payload: { ...userData, education: _education },
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
    <div className="bg-white w-full lg:w-[89%] flex flex-col gap-3 p-[30px] lg:ml-[15%] relative lg:rounded-md z-15">
      {showIcon && (
        <div
          onClick={() => {
            setShowModalAdd(true);
            valuetoAdd("education");
          }}
          className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 w-10 duration-200 h-10 text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] "
        >
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
                {item.institution}
              </h5>
              <p className="text-lg font-light text-gray-900">{item.degree}</p>
              <span className="text-md font-light text-gray-700">
                {item.year}
              </span>
            </div>
            {showIcon && (
              <div className="flex gap-2">
                <span
                  onClick={() => {
                    idEduSelected(item._id);
                    valuetoUpdate("education");
                    setShowModalUpdate(true);
                  }}
                  className="text-center p-1.5 text-gray-600 cursor-pointer duration-200 hover:bg-gray-100 hover:text-black rounded-[50%]"
                >
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

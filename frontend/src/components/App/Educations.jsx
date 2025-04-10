import { PlusIcon } from "@heroicons/react/24/outline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import educationImage from "../../../public/images/educationImage.png";
import { deleteEducation } from "../../services/profile";
import { AppSelector } from "../../selectors/AppSelector";
import { useDispatch } from "react-redux";
import { ERROR_MESSAGES } from "../../constants/Errors";

export const Educations = ({
  notification,
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

  const token = localStorage.getItem("token");

  const handleClickDelete = async (educationId) => {
    notification(null);
    try {
      const response = await deleteEducation(token, educationId);
      const _education = educationList.filter(
        (item) => item._id !== educationId
      );
      dispatch({
        type: "UPDATE_USERDATA",
        payload: { ...userData, education: _education },
      });
      notification({ type: "success", message: response.data.message });
    } catch (error) {
      error.response
        ? notification({
            type: "error",
            message: error.response.data.message,
          })
        : notification({ type: "error", message: ERROR_MESSAGES.TRY_AGAIN });
    }
  };

  return (
    <div className="bg-white w-full lg:w-[89%] flex flex-col gap-3 p-[30px] lg:ml-[15%] relative lg:rounded-md dark:bg-black">
      {showIcon && (
        <div
          onClick={() => {
            setShowModalAdd(true);
            valuetoAdd("education");
          }}
          className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 w-10 duration-200 h-10 text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
        >
          <PlusIcon strokeWidth="1.3" />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Education</h2>
      {educationList.map((item) => (
        <div key={item._id} className="flex items-center gap-3">
          <div className="mb-4 ">
            <img
              src={educationImage}
              alt="logo education"
              className="w-10 h-10"
            />
          </div>
          <div className=" w-full flex items-center justify-between pr-2">
            <div>
              <h5 className="text-xl font-semibold text-black dark:text-white">
                {item.institution}
              </h5>
              <p className="text-lg font-light text-gray-900 dark:text-white">
                {item.degree}
              </p>
              <span className="text-md font-light text-gray-700 dark:text-gray-500">
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
                  className="text-center p-1.5 text-gray-600 cursor-pointer duration-200 hover:bg-gray-100 hover:text-black rounded-[50%] dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
                >
                  <ModeEditOutlinedIcon />
                </span>
                <span
                  onClick={() => handleClickDelete(item._id)}
                  className="text-center p-1.5 text-gray-600 cursor-pointer duration-200 hover:bg-gray-100 hover:text-black rounded-[50%] dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
                >
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

import { PlusIcon } from "@heroicons/react/24/outline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import educationImage from "../../../public/images/educationImage.png";
import { AppSelector } from "../../selectors/AppSelector";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../services/profile";
import { ERROR_MESSAGES } from "../../constants/Errors";

export const ExperiencesModal = ({
  notification,
  valuetoUpdate,
  idEduSelected,
  setShowModalUpdate,
  valuetoAdd,
  setShowModalAdd,
  showIcon,
  experienceList,
}) => {
  const { userData } = AppSelector();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const handleClickDelete = async (experienceId) => {
    notification(null);
    try {
      const response = await deleteExperience(token, experienceId);
      const _experience = experienceList.filter(
        (item) => item._id !== experienceId
      );
      dispatch({
        type: "UPDATE_USERDATA",
        payload: { ...userData, experience: _experience },
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
    <div className="bg-white w-full lg:w-[89%] p-[30px] lg:ml-[15%] relative lg:rounded-md z-15 flex gap-3 flex-col">
      {showIcon && (
        <div
          onClick={() => {
            setShowModalAdd(true);
            valuetoAdd("experience");
          }}
          className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 w-10 duration-200 h-10  text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] "
        >
          <PlusIcon strokeWidth="1.3" />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>
      {experienceList.map((item) => (
        <div key={item._id} className="flex items-start gap-3">
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
                {item.position} - {item.company}
              </h5>
              <p className="text-lg font-light text-gray-900">
                {item.location}
              </p>
              <p className="text-lg font-light text-gray-900">{item.year}</p>
              <span className="text-sm font-light text-gray-900">
                {item.description}
              </span>
            </div>
            {showIcon && (
              <div className="flex gap-2">
                <span
                  onClick={() => {
                    setShowModalUpdate(true);
                    valuetoUpdate("experience");
                    idEduSelected(item._id);
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
    </div>
  );
};

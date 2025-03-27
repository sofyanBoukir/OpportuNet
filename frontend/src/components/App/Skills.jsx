import { PlusIcon } from "@heroicons/react/24/outline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";
import { AppSelector } from "../../selectors/AppSelector";
import { useDispatch } from "react-redux";
import { deleteSkill } from "../../services/profile";
import { ERROR_MESSAGES } from "../../constants/Errors";

export const Skills = ({
  notification,
  valuetoAdd,
  setShowModalAdd,
  showIcon,
  skillList,
}) => {
  const { userData } = AppSelector();
  const dispatch = useDispatch();
  const [hieghtDiv, setHieghtDiv] = useState(2);

  const token = localStorage.getItem("token");

  const handleClickDelete = async (indexSkill) => {
    notification(null);
    try {
      const response = await deleteSkill(token, indexSkill);
      const _skills = skillList.filter((item, index) => index !== indexSkill);
      dispatch({
        type: "UPDATE_USERDATA",
        payload: { ...userData, skills: _skills },
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

  const handleClickAll = () => {
    hieghtDiv === skillList.length
      ? setHieghtDiv(2)
      : setHieghtDiv(skillList.length);
  };

  return (
    <div className="bg-white w-full lg:w-[89%] p-[30px] lg:ml-[15%] relative lg:rounded-md">
      {showIcon && (
        <div
          onClick={() => {
            setShowModalAdd(true);
            valuetoAdd("skill");
          }}
          className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 w-10 duration-200 h-10  text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] "
        >
          <PlusIcon strokeWidth="1.3" />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      {skillList.map((item, index) => {
        if (index < hieghtDiv) {
          return (
            <div
              key={index}
              className="flex justify-baseline) mb-4 border-b border-b-gray-300 h-[30px]"
            >
              <div className=" w-full flex justify-between pr-2">
                <h5 className="text-md font-semibold text-black ">{item}</h5>
                {showIcon && (
                  <div
                    onClick={() => handleClickDelete(index)}
                    className="text-gray-600 cursor-pointer hover:text-black rounded-[50%]"
                  >
                    <span>
                      <DeleteOutlinedIcon />
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          return;
        }
      })}
      {skillList.length > 2 && (
        <div
          onClick={handleClickAll}
          className="text-center font-semibold text-sm text-gray-700 hover:bg-[#F3F3F3] duration-200 py-2 cursor-pointer"
        >
          {hieghtDiv === skillList.length
            ? `Close all ${skillList.length} skills`
            : `Show all ${skillList.length} skills`}
        </div>
      )}
    </div>
  );
};

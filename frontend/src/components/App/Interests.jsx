import { PlusIcon } from "@heroicons/react/24/outline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useState } from "react";

export const Interests = ({
  setShowModalUpdate,
  valuetoUpdate,
  showIcon,
  interestList,
}) => {
  const [hieghtDiv, setHieghtDiv] = useState(2);

  const handleClickAll = () => {
    hieghtDiv === interestList.length
      ? setHieghtDiv(2)
      : setHieghtDiv(interestList.length);
  };

  return (
    <div className="bg-white w-full lg:w-[89%] p-[30px] lg:ml-[15%] relative lg:rounded-md dark:bg-black">
      {showIcon && (
        <div
          onClick={() => {
            setShowModalUpdate(true);
            valuetoUpdate("intserest");
          }}
          className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 w-10 duration-200 h-10  text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
        >
          <ModeEditOutlinedIcon />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Intersts</h2>
      {interestList.map((item, index) => {
        if (index < hieghtDiv) {
          return (
            <div
              key={index}
              className="flex justify-baseline mb-4 border-b border-b-gray-300 h-[30px]"
            >
              <div className=" w-full flex justify-between pr-2">
                <h5 className="text-md font-semibold text-black dark:text-white">
                  {item.interest}
                </h5>
              </div>
            </div>
          );
        } else {
          return;
        }
      })}
      {interestList.length > 2 && (
        <div
          onClick={handleClickAll}
          className="text-center font-semibold text-sm text-gray-700 hover:text-black hover:cursor-pointer hover:bg-[#F3F3F3] duration-200 py-2 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white"
        >
          {hieghtDiv === interestList.length
            ? `Close all ${interestList.length} interests`
            : `Show all ${interestList.length} interests`}
        </div>
      )}
    </div>
  );
};

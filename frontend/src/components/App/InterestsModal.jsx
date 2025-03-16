import { PlusIcon } from "@heroicons/react/24/outline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";

export const InterestsModal = ({ showIcon, interestList }) => {
  const [hieghtDiv, setHieghtDiv] = useState(2);

  const handleClickAll = () => {
    hieghtDiv === interestList.length
      ? setHieghtDiv(2)
      : setHieghtDiv(interestList.length);
  };

  return (
    <div className="bg-white w-full lg:w-[55%] p-[30px] lg:ml-[10%] relative lg:rounded-md z-15">
      {showIcon && (
        <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[30px] h-[30px] text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
          <PlusIcon strokeWidth="1" />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Intersts</h2>
      {interestList.map((item, index) => {
        if (index < hieghtDiv) {
          return (
            <div
              key={index}
              className="flex justify-baseline mb-4 border-b border-b-gray-300 h-[30px]"
            >
              <div className=" w-full flex justify-between pr-2">
                <h5 className="text-md font-semibold text-black ">{item}</h5>
                {showIcon && (
                  <div className="text-gray-600 cursor-pointer hover:text-black rounded-[50%]">
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
      <div
        onClick={handleClickAll}
        className="text-center font-semibold text-sm text-gray-700 hover:text-black hover:cursor-pointer"
      >
        {hieghtDiv === interestList.length
          ? `Close all ${interestList.length} skills`
          : `Show all ${interestList.length} skills`}
      </div>
    </div>
  );
};

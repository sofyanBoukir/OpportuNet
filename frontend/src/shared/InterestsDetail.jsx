import { PlusIcon } from "@heroicons/react/24/outline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { AppSelector } from "../selectors/AppSelector";
import { UrlProfilModal } from "../components/modals/UrlProfilModal";
export const InterestsDetail = () => {
  const { interests } = AppSelector();
  return (
    <div>
      <div className="w-full fixed bg-[#F4F2EE] h-screen"></div>
      <div className="h-[100px] w-full 2xl:w-[80%] relative top-[50px] 2xl:left-[10%]">
        <div className="p-[30px] !pb-[10px)] bg-white w-full 2xl:w-[65%] h-auto 2xl:rounded-lg absolute top-0 2xl:top-5 left-0 2xl:left-5 z-15">
          <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[30px] h-[30px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
            <PlusIcon strokeWidth="1" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Interests</h2>
          {interests &&
            interests.map((item, index) => (
              <div
                key={index}
                className="flex justify-baseline mb-4 border-b border-b-gray-300 h-[30px]"
              >
                <div className=" w-full flex justify-between pr-2">
                  <h5 className="text-md font-semibold text-black ">{item}</h5>

                  <div>
                    <span className="w-[25px] h-[25px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
                      <DeleteOutlinedIcon />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

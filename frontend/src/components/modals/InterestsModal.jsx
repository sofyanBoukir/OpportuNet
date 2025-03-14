import { PlusIcon } from "@heroicons/react/24/outline";
import { SkillModal } from "./SkillModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InterestModal } from "./InterestModal";

export const InterestsModal = ({ interestList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickAll = () => {
    dispatch({ type: "Add_INTERESTS", payload: interestList });
    navigate("/user/detail/interests");
  };
  return (
    <div className="p-[30px] !pb-[10px] bg-white w-full 2xl:w-[65%] h-auto 2xl:rounded-lg absolute top-[1255px] md:top-[1270px] 2xl:top-[1310px] left-0 2xl:left-5 z-15">
      <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[30px] h-[30px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
        <PlusIcon strokeWidth="1" />
      </div>
      <h2 className="text-xl font-semibold mb-4">Intersts</h2>
      {interestList.map((item, index) => {
        if (index < 2) {
          return <InterestModal key={index} interest={item} />;
        } else {
          return;
        }
      })}
      <div
        onClick={handleClickAll}
        className="text-center font-semibold text-sm text-gray-700 hover:text-black hover:cursor-pointer"
      >{`See all ${interestList.length} skills`}</div>
    </div>
  );
};

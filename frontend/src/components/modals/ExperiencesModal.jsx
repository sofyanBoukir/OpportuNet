import { PlusIcon } from "@heroicons/react/24/outline";
import { ExperienceModal } from "./ExperienceModal";

export const ExperiencesModal = ({ experienceList }) => {
  return (
    <div className="p-[30px] bg-white w-full 2xl:w-[65%] h-auto 2xl:rounded-lg absolute top-[815px] md:top-[820px] 2xl:top-[865px] left-0 2xl:left-5 z-15">
      <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[30px] h-[30px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
        <PlusIcon strokeWidth="1" />
      </div>
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experienceList.map((item) => {
        return <ExperienceModal key={item.namePost} experienceInfo={item} />;
      })}
    </div>
  );
};

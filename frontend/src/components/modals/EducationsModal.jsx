import { PlusIcon } from "@heroicons/react/24/outline";
import { EducationModal } from "./EducationModal";

// import educationImg from "../../../public/images/educationDefault.png";
export const EducationsModal = ({ educationList }) => {
  return (
    <div className="p-[30px] bg-white w-full 2xl:w-[65%] h-auto 2xl:rounded-lg absolute top-[579px] md:top-[580px] 2xl:top-[629px] left-0 2xl:left-5 z-15">
      <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[30px] h-[30px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
        <PlusIcon strokeWidth="1" />
      </div>
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      {educationList.map((item) => {
        return <EducationModal key={item.nameSchool} educationInfo={item} />;
      })}
    </div>
  );
};

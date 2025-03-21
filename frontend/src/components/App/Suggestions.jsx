import { useState } from "react";
import { Follow } from "../UI/Follow";
import { SuggesstionsSkeleton } from "../skeletons/SuggesstionsSkeleton";

export const SuggestionsModal = ({ suggestionList }) => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  return (
    <div>
      {!loading && (
        <div className="p-3 bg-white w-full lg:w-full lg:rounded-lg">
          <h1 className="text-xl font-semibold">People you may know</h1>
          <span className="text-gray-500">Based on your interests</span>
          {suggestionList.map((item) => (
            <div
              key={item._id}
              className="p-2 w-full flex gap-2 items-center mt-2 relative border-b border-b-gray-300"
            >
              <div>
                <img
                  src="../../public/images/profilDefault.png"
                  className="w-16 h-16 rounded-full m-auto"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">{item.sugName}</p>
                <span className="text-gray-900">{item.sugHead}</span>
                <Follow
                  type={"text"}
                  className={
                    "bg-inherit hover:bg-gray-100 w-[90%] h-7 duration-200 rounded-full font-semibold border-2 border-gray-500 text-gray-600"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {loading && <SuggesstionsSkeleton />}
    </div>
  );
};

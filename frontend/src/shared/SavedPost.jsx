import React, { useEffect, useRef, useState } from "react";
import { SuggestionsModal } from "../components/App/Suggestions";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { getSavedPost } from "../services/Saved";
import { Link, useNavigate } from "react-router-dom";

const authService = import.meta.env.VITE_SERVER_URL;

export const SavedPost = () => {
  const [dataSavedPost, setDataSavedPost] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const SavedPost = async () => {
    // try{
    const response = await getSavedPost(localStorage.getItem("token"));
    console.log(response.data.savedPosts.savedPosts);
    if (response.data.savedPosts.savedPosts) {
      setDataSavedPost(response.data.savedPosts.savedPosts);
      setLoading(false);
    }

    // }
  };

  useEffect(() => {
    SavedPost();
  }, []);
  const suggestions = [
    { sugName: "Ayoub Mhainid", sugHead: "UI/UX designer" },
    { sugName: "Soufiane Boukir", sugHead: "Go developer" },
    { sugName: "Said kachoud", sugHead: "PHP developer" },
  ];

  return (
    <div className="md:px-[10%] px-3 relative top-16">
      <div className="flex justify-center gap-[1%]">
        <ProfileStatus />
        <div className="flex flex-col w-[100%] lg:w-[43%] h-max left-[13%] lg:relative bg-white rounded-2xl ">
          {dataSavedPost && !loading
            ? dataSavedPost.map((saved, index) => {
                const contentPreview = saved.content?.slice(
                  0,
                  Math.ceil(saved.content.length * 0.3)
                );
                return (
                  <div
                    key={saved._id}
                    className="w-[100%] px-5 py-3 flex flex-col"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <img
                        src={saved.user.profile_picture}
                        className="w-[10%] rounded-full"
                      />
                      <h1 className="text-lg font-semibold">
                        {saved.user.name}
                      </h1>
                    </div>
                    <div className="mt-4 w-full flex flex-row gap-3">
                      {saved.image && (
                        <img
                          src={`http://localhost:3000${saved.image}`}
                          alt="image not found"
                          className="w-[40%] rounded-2xl"
                        />
                      )}

                      <div>
                        <p>{contentPreview}...</p>
                        {saved.content.length > contentPreview.length && (
                          <button
                            onClick={() => navigate(`/post/${saved._id}`)}
                            className="text-gray-500 hover:underline hover:cursor-pointer ml-2"
                          >
                            ...See More
                          </button>
                        )}
                      </div>
                    </div>
                    {index < dataSavedPost.length - 1 && (
                      <hr className="my-2 border-gray-300" />
                    )}
                  </div>
                );
              })
            : null}
        </div>

        <div className="hidden sticky  lg:block left-[13%] lg:relative lg:w-[25%]">
          <div className="sticky top-16">
            <SuggestionsModal suggestionList={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};

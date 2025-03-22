import React, { useEffect, useRef, useState } from "react";
import { SuggestionsModal } from "../components/App/Suggestions";
import { ProfileStatus } from "../components/App/ProfileStatus";
import { getSavedPost } from "../services/saved";
import { Link, useNavigate } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import { ArrowDownCircleIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { SavedPostSkeleton } from "../components/skeletons/SavedPostSkeleton";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const SavedPosts = () => {
  const [dataSavedPost, setDataSavedPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalSavedPosts, setTotalSavedPosts] = useState(null);

  const SavedPost = async () => {
    try {
      const response = await getSavedPost(localStorage.getItem("token"), page);
      setLastPage(response.data.lastPage);
      setTotalSavedPosts(response.data.totalSavedPosts);

      if (page === 1) {
        setDataSavedPost(response.data.savedPosts.savedPosts);
      } else {
        setDataSavedPost((prevPosts) => [
          ...prevPosts,
          ...response.data.savedPosts.savedPosts,
        ]);
      }
      setTimeout(() => {
        setLoading(false)
    }, 3000);
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    SavedPost();
  }, [page]);
  const suggestions = [
    { sugName: "Ayoub Mhainid", sugHead: "UI/UX designer" },
    { sugName: "Soufiane Boukir", sugHead: "Go developer" },
    { sugName: "Said kachoud", sugHead: "PHP developer" },
  ];

  return (
    <div className="md:px-[10%] px-3 relative top-16">
      <div className="flex justify-center gap-[1%]">
        <div className="hidden md:block bg-white px-2 py-3 rounded-2xl h-fit">
          <div className="flex flex-row gap-2 py-1  ">
            <BookmarkIcon className="text-gray-500 w-5" />
            <h1 className="text-gray-500 font-semibold">My elements</h1>
          </div>
          <hr className="text-gray-400 mt-3" />
          <div className="py-2 px-2 text-blue-600 font-semibold text-sm flex flex-row gap-5 items-center">
            <h1 className="cursor-pointer">Saved Posts and Articles</h1>
            {dataSavedPost && !loading ? (
              <span className="text-black text-md font-normal">
                {dataSavedPost.length}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col w-[100%] lg:w-[43%] h-max  lg:relative bg-white rounded-2xl ">
        {loading && <SavedPostSkeleton />}
          {dataSavedPost && !loading
            ? dataSavedPost.map((saved, index) => {
                const contentPreview = saved.content?.slice(
                  0,
                  Math.ceil(saved.content.length * 0.8)
                );
                return (
                  <div
                    key={saved._id}
                    className="w-[100%] px-5 py-3 flex flex-col"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <img
                        src={saved.user.profilePictureUrl}
                        className="w-[10%] rounded-full object-cover"
                      />
                      <div>
                        <h1 className="text-lg font-semibold">
                          {saved.user.name}
                        </h1>
                        <span className="text-sm text-gray-700 font-semibold">{saved.user.headLine}</span>
                      </div>
                    </div>
                    <div className="mt-4 w-full flex flex-row gap-3">
                      {saved.image && (
                        <img
                          src={serverURL + saved.image}
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
            {!loading && lastPage !== page && totalSavedPosts !== 0 && <ArrowDownCircleIcon onClick={() => setPage(page+1)} className="flex mx-auto cursor-pointer my-3 text-blue-700 hover:text-blue-600 duration-200 w-12 h-12" /> }

        </div>

        <div className="hidden sticky  lg:block lg:relative lg:w-[25%]">
          <div className="sticky top-16">
            <SuggestionsModal suggestionList={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};

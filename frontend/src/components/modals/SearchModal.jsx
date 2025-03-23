import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import profilDefault from "../../../public/images/profilDefault.png";
import { useEffect, useState } from "react";
import { getSuggesstedUsers } from "../../services/home";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { AppSelector } from "../../selectors/AppSelector";
import { serachUsersPosts } from "../../services/search";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const SearchModal = () => {
  const { querySearch } = AppSelector();
  const [error, setError] = useState(null);
  const [suggesstedUsers, setSuggesstedUsers] = useState([]);

  useEffect(() => {
    const _getSuggesstedUsers = async () => {
      setError(null);
      try {
        const response = await getSuggesstedUsers(
          localStorage.getItem("token")
        );
        response.data.suggesstedUsers.length
          ? setSuggesstedUsers(response.data.suggesstedUsers)
          : setError(ERROR_MESSAGES.NOT_FOUND);
      } catch (err) {
        console.log(err);
        err.response
          ? setError(response.data.message)
          : setError(ERROR_MESSAGES.TRY_AGAIN);
      }
    };

    _getSuggesstedUsers();
  }, []);

  useEffect(() => {
    const _serachUsersPosts = async () => {
      console.log("query", querySearch);
      setError(null);
      try {
        const response = await serachUsersPosts(
          localStorage.getItem("token"),
          querySearch
        );
        console.log("ss", response);
      } catch (err) {
        console.log(err.response);
      }
    };
    querySearch.query && _serachUsersPosts();
  }, [querySearch]);

  return (
    <div className="w-full">
      <div className="fixed w-full inset-0 bg-black/50 backdrop-bl)ur-xs z-20 top-[55px]">
        <div className=" w-[85%] sm:w-[90%] lg:w-[30%] ml-[14%] sm:ml-[9%] lg:ml-[14%] relative">
          <div className="border-t rounded-xl flex flex-col bg-white sticky md:left-[65%] shadow-2xl md:top-[75px] z-40">
            {suggesstedUsers.length ? (
              <div>
                <div className="px-4 py-1 mb-1">
                  <h1 className="font-bold text-sm mb-2">Suggestions</h1>
                  <div className="flex gap-3 flex-wrap">
                    {suggesstedUsers.map((item) => (
                      <div className="w-[70px] flex flex-col items-center p-1 hover:bg-gray-100 duration-200 cursor-pointer">
                        <div className="w-10 h-10 rounded-[50%]">
                          <img
                            src={`${serverURL}` + item.profile_picture}
                            alt=""
                            className="w-10 h-10 rounded-[50%]"
                          />
                        </div>
                        <h5 className="font-semibold text-md text-center">
                          {item.name}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 duration-200 cursor-pointer ">
                  <ClockIcon strokeWidth="2" className="w-5 h-5" />
                  <h5 className="font-semibold text-md text-center">
                    kachoud said
                  </h5>
                </div>
              </div>
            ) : (
              <span className="p-4 font-semibold text-sm">{error}</span>
            )}

            <div className="flex items-center justify-between px-4 py-1 gap-4 hover:bg-gray-100 duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <MagnifyingGlassIcon strokeWidth="2" className="w-5 h-5" />
                <div className="flex items-center gap-1">
                  <h5 className="font-semibold text-md">kachoud said</h5>
                  <span>.</span>
                  <h6 className="font-normal text-sm text-gray-800">
                    full stack...
                  </h6>
                </div>
              </div>
              <div className="w-10 h-10 rounded-[50%]">
                <img src={profilDefault} alt="" className="rounded-[50%]" />
              </div>
            </div>

            <div className="text-center text-[#0A66C2] font-semibold p-2 mt-2 border-t rounded-b-xl border-t-gray-100 hover:bg-gray-100 duration-200 cursor-pointer">
              See all results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

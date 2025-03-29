import { ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import profilDefault from "../../../public/images/profilDefault.png";
import { useEffect, useState } from "react";
import { getSuggesstedUsers } from "../../services/home";
import { ERROR_MESSAGES } from "../../constants/Errors";

import { getserachUsers } from "../../services/search";

// import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const SearchModal = ({ query, openSearchModal }) => {
  const [usersSearch, setUsersSearch] = useState([]);
  const [error, setError] = useState(null);
  const [suggesstedUsers, setSuggesstedUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isVide, setIsVide] = useState(false);

  const navigate = useNavigate();

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
        err.response
          ? setNotification({ type: "error", message: err.response.message })
          : setNotification({
              type: "error",
              message: ERROR_MESSAGES.TRY_AGAIN,
            });
      }
    };

    _getSuggesstedUsers();
  }, []);

  useEffect(() => {
    const _getserachUsers = async () => {
      setError(null);
      setIsVide(false);
      try {
        const response = await getserachUsers(
          localStorage.getItem("token"),
          query
        );

        setUsersSearch(response.data.users);
      } catch (err) {
        err.response
          ? setNotification({ type: "error", message: err.response.message })
          : setNotification({
              type: "error",
              message: ERROR_MESSAGES.TRY_AGAIN,
            });
      }
    };
    query !== "" ? _getserachUsers() : setIsVide(true);
  }, [query]);

  const handleClickUser = (user) => {
    openSearchModal(false);
    navigate(`/user/profile/${user._id}`);
  };

  return (
    <div className="w-full">
      <div className="fixed w-full inset-0 bg-black/50 backdrop-bl)ur-xs z-25 top-[60px]">
        <div className=" w-[85%] sm:w-[90%] lg:w-[30%] ml-[14%] sm:ml-[9%] lg:ml-[14%] relative">
          <div className="border-t rounded-xl flex flex-col bg-white sticky md:left-[65%] shadow-2xl md:top-[70px] z-40 dark:bg-black dark:text-white">
            {!isVide ? (
              usersSearch.length ? (
                usersSearch.map((item, index) => {
                  if (index < 8) {
                    return (
                      <div
                        onClick={() => handleClickUser(item)}
                        className="flex items-center justify-between px-4 py-1 gap-4 hover:bg-gray-100 duration-200 cursor-pointer dark:hover:bg-gray-900"
                      >
                        <div className="flex items-center gap-3">
                          <MagnifyingGlassIcon
                            strokeWidth="2"
                            className="w-5 h-5"
                          />
                          <div className="flex items-center gap-1">
                            <h5 className="font-semibold text-md">
                              {item.name}
                            </h5>
                            <span>.</span>
                            <h6 className="font-normal text-sm text-gray-800 dark:text-white">
                              {item.headLine}
                            </h6>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-[50%]">
                          <img
                            src={`${serverURL}` + item.profile_picture}
                            alt=""
                            className="w-10 h-10 rounded-[50%]"
                          />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <span className="bg-white dark:bg-black dark:text-white font-semibold text-md p-4">
                  {ERROR_MESSAGES.NOT_FOUND}
                </span>
              )
            ) : (
              <div>
                <div className="px-4 py-1 mb-1 w-full">
                  <h1 className="font-bold text-sm mb-2">Suggestions</h1>
                  <div
                    className={`flex gap-3 ${
                      suggesstedUsers.length > 3 && "justify-evenly"
                    } flex-wrap w-full`}
                  >
                    {suggesstedUsers.map((item) => (
                      <div
                        onClick={() => {
                          openSearchModal(false);
                          navigate(`/user/profile/${item._id}`);
                        }}
                        className="w-[15%] flex flex-col items-center p-1 duration-200 cursor-pointer"
                      >
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
                {/* <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 duration-200 cursor-pointer ">
                  <ClockIcon strokeWidth="2" className="w-5 h-5" />
                  <h5 className="font-semibold text-md text-center">
                    kachoud said
                  </h5>
                </div> */}
              </div>
            )}

            {!isVide && usersSearch.length > 0 && (
              <div
                onClick={() => {
                  openSearchModal(false);
                  navigate(`/search/results/all/${query}`);
                }}
                className="text-center dark:hover:bg-gray-950 text-[#0A66C2] font-semibold p-2 mt-2 border-t rounded-b-xl border-t-gray-100 hover:bg-gray-100 duration-200 cursor-pointer"
              >
                See all results
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

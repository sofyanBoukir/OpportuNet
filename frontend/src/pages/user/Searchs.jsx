import { Post } from "../../components/App/Post";
import profilDefault from "../../../public/images/profilDefault.png";
import { AppSelector } from "../../selectors/AppSelector";
import { Link, useParams } from "react-router-dom";
import { Follow } from "../../components/UI/Follow";
import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { getserachUsersPosts } from "../../services/search";
import ExtraLoader from "../../components/UI/ExtraLoader";
import { searchForJobs } from "../../services/job";
import { Notification } from "../../components/UI/Notification";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const Searchs = () => {
  // const { resultSearch } = AppSelector();
  const { query } = useParams();
  const [resultSearchUsers, setRresultSearchUsers] = useState([]);
  const [resultSearchPosts, setRresultSearchPosts] = useState([]);
  const [resultSearchJobs, setRresultSearchJobs] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [viewByUser, setViewByUser] = useState(false);
  const [viewByPosts, setViewByPosts] = useState(false);
  const [viewByJobs, setViewByJobs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heightUsers, setHeightUsers] = useState(3);
  const [heightPosts, setHeightPosts] = useState(3);
  const [heightJobs, setHeiJobs] = useState(3);

  useEffect(() => {
    const _getserachUsersPosts = async () => {
      setLoading(true);
      setViewByUser(false);
      setViewByPosts(false);
      try {
        const response = await getserachUsersPosts(
          localStorage.getItem("token"),
          query
        );
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        response.data.users.length
          ? setRresultSearchUsers(response.data.users)
          : setViewByUser(true);
        response.data.posts.length
          ? setRresultSearchPosts(response.data.posts)
          : setViewByPosts(true);
      } catch (err) {
        err.response
          ? setNotification({ type: "error", message: err.response.message })
          : setNotification({
              type: "error",
              message: ERROR_MESSAGES.TRY_AGAIN,
            });
      }
    };

    const _getSearchJobs = async () => {
      setViewByJobs(false);
      setLoading(true);
      setError(null);
      try {
        const response = await searchForJobs(
          localStorage.getItem("token"),
          query
        );
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setRresultSearchJobs(response.data.jobs);
      } catch (err) {
        switch (response.status) {
          case 404:
            setViewByJobs(true);
            setError(err.response.data.message);
            break;
          case 500:
            err.response
              ? setNotification({
                  type: "error",
                  message: err.response.message,
                })
              : setNotification({
                  type: "error",
                  message: ERROR_MESSAGES.TRY_AGAIN,
                });
            break;
        }
      }
    };

    _getserachUsersPosts();
    _getSearchJobs();
  }, []);

  return (
    <div className="relative top-[60px]">
      {/* <div className="bg-white border-t fixed w-full z-20 border-t-gray-300 h-[60px] shadow-lg flex items-center justify-center lg:justify-start gap-2 px-[10%]">
        <Button text="Posts" className="border text-gray-700 border-gray-400 !rounded-2xl cursor-pointer hover:bg-gray-200 hover:outline-2" />
        <Button text="People" className="border text-gray-700 border-gray-400 !rounded-2xl cursor-pointer hover:bg-gray-200 hover:outline-2" />
        <Button text="Jobs" className="border text-gray-700 border-gray-400 !rounded-2xl cursor-pointer hover:bg-gray-200 hover:outline-2" />
      </div> */}
      <div className="flex justify-center gap-[1%]">
        <div className="bg-white hidden lg:block rounded-lg border border-gray-300 w-[15%] left-[10%] mt-5 fixed ">
          <div className="p-4 font-semibold text-xl">On this page</div>
          <ul className="mt-4) mb-2 ">
            <li className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200">
              Posts
            </li>
            <li className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200">
              People
            </li>
            <li className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200">
              Jobs
            </li>
          </ul>
        </div>
        {loading && (
          <div className="mt-20">
            <ExtraLoader />
          </div>
        )}

        {!loading && (
          <div className="w-full mb-20 lg:mb-2 lg:w-[40%] flex flex-col gap-4 mt-5 lg:relative">
            <div className="bg-white rounded-lg duration-500">
              <h3 className="p-4 font-semibold text-xl">People</h3>
              {resultSearchUsers.length ? (
                resultSearchUsers.map((item, index) => {
                  if (index < heightUsers) {
                    return (
                      <div className="mb-2">
                        <div className="pl-4 p-2 pr-10 flex justify-between">
                          <div className="flex gap-4">
                            <div className="w-15 h-15 rounded-[50%]">
                              <img
                                src={`${serverURL}` + item.profile_picture}
                                alt=""
                                className="w-15 h-15 rounded-[50%]"
                              />
                            </div>
                            <div>
                              <h1>
                                <Link
                                  className="font-semibold text-lg hover:underline"
                                  to={`/user/profile/${item._id}`}
                                >
                                  {item.name}
                                </Link>
                              </h1>
                              <h6 className="font-normal text-md text-gray-900">
                                {item.headLine}
                              </h6>
                              <div className="text-md text-gray-600">
                                {item.location}
                              </div>
                            </div>
                          </div>
                          <Follow
                            userId={item._id}
                            className="border-2 h-[40px] !px-5 text-[#0A66C2] border-[#0A66C2] !rounded-3xl cursor-pointer hover:bg-blue-100"
                          />
                        </div>
                        <hr
                          className={
                            index + 1 === heightUsers
                              ? "hidden"
                              : "ml-23 text-gray-300"
                          }
                        />
                      </div>
                    );
                  }
                })
              ) : (
                <span className="font-semibold text-md p-4">
                  Users not found
                </span>
              )}
              <div
                onClick={() => {
                  heightUsers === resultSearchUsers.length
                    ? setHeightUsers(3)
                    : setHeightUsers(resultSearchUsers.length);
                }}
                className="bg-white text-center text-[#0A66C2] font-semibold p-2 border-t rounded-b-xl border-t-gray-300 hover:bg-gray-100 duration-200 cursor-pointer"
              >
                {heightUsers === resultSearchUsers.length
                  ? "Close all results"
                  : "See all results"}
              </div>
            </div>

            <div className="rounded-lg">
              <h3 className="bg-white rounded-t-lg p-4 font-semibold text-xl">
                Posts
              </h3>
              <div className="flex flex-col gap-2">
                {resultSearchPosts.length ? (
                  resultSearchPosts.map((item, index) => {
                    if (index < heightPosts) {
                      return (
                        <div className="bg-white">
                          <Post post={item} />
                        </div>
                      );
                    }
                  })
                ) : (
                  <span className="font-semibold text-md p-4">
                    Posts not found
                  </span>
                )}
              </div>
              <div
                onClick={() => {
                  heightPosts === resultSearchPosts.length
                    ? setHeightPosts(3)
                    : setHeightPosts(resultSearchPosts.length);
                }}
                className="bg-white text-center text-[#0A66C2] font-semibold p-2 mt-1 rounded-b-xl border-t-gray-500 hover:bg-gray-100 duration-200 cursor-pointer"
              >
                {heightPosts === resultSearchPosts.length
                  ? "Close all results"
                  : "See all results"}
              </div>
            </div>

            <div className="bg-white rounded-lg duration-500">
              <h3 className="p-4 font-semibold text-xl">Jobs</h3>
              {resultSearchJobs.length ? (
                resultSearchJobs.map((item, index) => {
                  if (index < heightJobs) {
                    return (
                      <div className="mb-2">
                        <div className="pl-4 p-2 pr-10 flex justify-between">
                          <div className="flex gap-4">
                            <div className="w-15 h-15 rounded-[50%]">
                              <img
                                src={profilDefault}
                                alt=""
                                className="w-15 h-15 rounded-[50%]"
                              />
                            </div>
                            <div>
                              <h1 className="font-semibold text-lg hover:underline">
                                <Link
                                //  to={`/user/profile/${item._id}`}
                                >
                                  {resultSearchJobs.title}
                                </Link>
                              </h1>
                              <h6 className="font-normal text-md text-gray-900">
                                {resultSearchJobs.company}
                              </h6>
                              <div className="text-md text-gray-600">
                                {resultSearchJobs.location}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className={"ml-23 text-gray-300"} />
                      </div>
                    );
                  }
                })
              ) : (
                <span className="font-semibold text-md p-4">
                  jobs not found
                </span>
              )}
              {viewByJobs && (
                <div
                  onClick={() => {
                    heightJobs === resultSearchJobs.length
                      ? setHeightUsers(3)
                      : setHeightUsers(resultSearchJobs.length);
                  }}
                  className="bg-white text-center text-[#0A66C2] font-semibold p-2 border-t rounded-b-lg border-t-gray-300 hover:bg-gray-100 duration-200 cursor-pointer"
                >
                  {heightJobs === resultSearchJobs.length
                    ? "Close all results"
                    : "See all results"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

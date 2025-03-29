import { Post } from "../../components/App/Post";
import profilDefault from "../../../public/images/profilDefault.png";
import { Link, useParams } from "react-router-dom";
import { Follow } from "../../components/UI/Follow";
import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { getserachPosts, getserachUsers } from "../../services/search";
import ExtraLoader from "../../components/UI/ExtraLoader";
import { searchForJobs } from "../../services/job";
import { Notification } from "../../components/UI/Notification";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const Searchs = () => {
  const { query } = useParams();
  const [resultSearchUsers, setResultSearchUsers] = useState([]);
  const [resultSearchPosts, setResultSearchPosts] = useState([]);
  const [resultSearchJobs, setResultSearchJobs] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [viewByUser, setViewByUser] = useState(true);
  const [viewByPosts, setViewByPosts] = useState(true);
  const [viewByJobs, setViewByJobs] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingJob, setLoadingJob] = useState(false);
  const [heightUsers, setHeightUsers] = useState(3);
  const [heightJobs, setHeightJobs] = useState(3);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(0);

  useEffect(() => {
    const _getserachUsers = async () => {
      setLoadingUser(true);
      setViewByUser(true);
      try {
        const response = await getserachUsers(
          localStorage.getItem("token"),
          query
        );

        setLoadingUser(false);
        response.data.users.length
          ? setResultSearchUsers(response.data.users)
          : setViewByUser(false);
      } catch (err) {
        setLoadingUser(false);
        err.response
          ? setNotification({ type: "error", message: err.response.message })
          : setNotification({
              type: "error",
              message: ERROR_MESSAGES.TRY_AGAIN,
            });
      }
    };
    _getserachUsers();
  }, [query]);

  useEffect(() => {
    const _getserachPosts = async (page) => {
      setLoadingPost(true);
      setViewByPosts(true);
      try {
        const response = await getserachPosts(
          localStorage.getItem("token"),
          query,
          page
        );

        setLoadingPost(false);

        response.data.posts.length
          ? (setResultSearchPosts([
              ...resultSearchPosts,
              ...response.data.posts,
            ]),
            setTotalPage(response.data.totalPages))
          : setViewByPosts(false);
      } catch (err) {
        setLoadingPost(false);
        err.response
          ? setNotification({ type: "error", message: err.response.message })
          : setNotification({
              type: "error",
              message: ERROR_MESSAGES.TRY_AGAIN,
            });
      }
    };
    _getserachPosts(page);
  }, [query, page]);

  useEffect(() => {
    const _getSearchJobs = async () => {
      setViewByJobs(true);
      setLoadingJob(true);
      setError(null);
      try {
        const response = await searchForJobs(
          localStorage.getItem("token"),
          query
        );

        setLoadingJob(false);
        setResultSearchJobs(response.data.jobs);
      } catch (err) {
        setLoadingJob(false);
        switch (err.response.status) {
          case 404:
            setViewByJobs(false);
            setResultSearchJobs([]);
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

    _getSearchJobs();
  }, [query]);

  return (
    <div className="relative top-[60px]">
      <div className="flex justify-center gap-[1%]">
        <div className="bg-white hidden lg:block rounded-lg border border-gray-300 w-[15%] left-[10%] mt-5 fixed dark:bg-black dark:text-white">
          <div className="p-4 font-semibold text-xl">On this page</div>
          <ul className="mb-2 ">
            <li className="dark:text-white px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
              <a href="#people">People</a>
            </li>
            <li className="dark:text-white px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
              <a href="#posts">Posts</a>
            </li>
            <li className="dark:text-white px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
              <a href="#jobs">Jobs</a>
            </li>
          </ul>
        </div>

        <div className="w-full mb-20 lg:mb-2 lg:w-[40%] flex flex-col gap-4 mt-5 lg:relative">
          <div className="bg-white rounded-lg duration-500 dark:bg-black dark:text-white">
            <h3 id="people" className="p-4 font-semibold text-xl">
              People
            </h3>
            {loadingUser && (
              <div className="mt-20">
                <ExtraLoader />
              </div>
            )}
            {!loadingUser && (
              <>
                {resultSearchUsers.length ? (
                  resultSearchUsers.map((item, index) => {
                    if (index < heightUsers) {
                      return (
                        <div key={item._id} className="mb-2 ">
                          <div className="pl-4 p-2 pr-10 flex justify-between">
                            <div className="flex gap-4 ">
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
                                <h6 className="dark:text-white font-normal text-md text-gray-900">
                                  {item.headLine}
                                </h6>
                                <div className="dark:text-white text-md text-gray-600">
                                  {item.location}
                                </div>
                              </div>
                            </div>
                            <Follow
                              userId={item._id}
                              className="border-2 h-[40px] !px-5 text-[#0A66C2] border-[#0A66C2] !rounded-3xl cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-900"
                            />
                          </div>
                          <hr
                            className={
                              index + 1 === heightUsers ||
                              index + 1 === resultSearchUsers.length
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
                    No users starts with this query
                  </span>
                )}
              </>
            )}
            {viewByUser && resultSearchUsers.length > 3 && (
              <div
                onClick={() => {
                  heightUsers === resultSearchUsers.length
                    ? setHeightUsers(3)
                    : setHeightUsers(resultSearchUsers.length);
                }}
                className="dark:bg-black dark:text-white bg-white text-center text-[#0A66C2] font-semibold p-2 border-t rounded-b-xl border-t-gray-300 hover:bg-gray-100 duration-200 cursor-pointer dark:hover:bg-gray-900"
              >
                {heightUsers === resultSearchUsers.length
                  ? "Close all results"
                  : "See all results"}
              </div>
            )}
          </div>

          <div className="rounded-lg">
            <h3
              id="posts"
              className="bg-white  dark:bg-black dark:text-white rounded-t-lg p-4 font-semibold text-xl"
            >
              Posts
            </h3>
            <div className="flex flex-col gap-2">
              {resultSearchPosts.length > 0 &&
                resultSearchPosts.map((item) => {
                  return (
                    <div key={item._id} className="bg-white dark:bg-black">
                      <Post post={item} />
                    </div>
                  );
                })}
              {!loadingPost && resultSearchPosts.length === 0 && (
                <span className="bg-white font-semibold text-md p-4">
                  No posts starts with this query
                </span>
              )}
              {loadingPost ? (
                <div className="!bg-white mt-50">
                  <ExtraLoader />
                </div>
              ) : null}
            </div>
            {viewByPosts && page < totalpage && (
              <div
                onClick={() => {
                  setPage((prev) => prev + 1);
                }}
                className="dark:bg-black dark:text-white bg-white text-center text-[#0A66C2] font-semibold p-2 mt-1 rounded-b-xl border-t-gray-500 hover:bg-gray-100 duration-200 cursor-pointer"
              >
                See more results
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg duration-500 dark:bg-black dark:text-white">
            <h3 id="jobs" className="p-4 font-semibold text-xl">
              Jobs
            </h3>
            {loadingJob && (
              <div className="mt-20">
                <ExtraLoader />
              </div>
            )}
            {!loadingJob && (
              <>
                {resultSearchJobs.length ? (
                  resultSearchJobs.map((item, index) => {
                    if (index < heightJobs) {
                      return (
                        <div key={item} className="mb-2">
                          <div className="pl-4 p-2 pr-10 flex justify-between">
                            <div className="flex gap-4">
                              <div className="w-15 h-15 rounded-[50%])">
                                <img
                                  src={profilDefault}
                                  alt=""
                                  className="w-15 h-15 rounded-[50%])"
                                />
                              </div>
                              <div>
                                <h1 className="dark:text-white font-semibold text-lg hover:underline">
                                  <Link to={`/job-detail/${item._id}`}>
                                    {item.title}
                                  </Link>
                                </h1>
                                <h6 className="font-normal dark:text-white text-md text-gray-900">
                                  {item.company}
                                </h6>
                                <div className="text-md dark:text-white text-gray-600">
                                  {item.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr
                            className={
                              index + 1 === heightJobs ||
                              index + 1 === resultSearchJobs.length
                                ? "hidden"
                                : "ml-23 text-gray-300"
                            }
                          />
                        </div>
                      );
                    }
                  })
                ) : (
                  <span className="bg-white dark:bg-black dark:text-white font-semibold text-md px-4">
                    {error}
                  </span>
                )}
              </>
            )}
            {viewByJobs && resultSearchJobs.length > 3 && (
              <div
                onClick={() => {
                  heightJobs === resultSearchJobs.length
                    ? setHeightJobs(3)
                    : setHeightJobs(resultSearchJobs.length);
                }}
                className="dark:bg-black dark:text-white bg-white text-center text-[#0A66C2] font-semibold p-2 border-t rounded-b-lg border-t-gray-300 hover:bg-gray-100 duration-200 cursor-pointer dark:hover:bg-gray-900"
              >
                {heightJobs === resultSearchJobs.length
                  ? "Close all results"
                  : "See all results"}
              </div>
            )}
          </div>
        </div>
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

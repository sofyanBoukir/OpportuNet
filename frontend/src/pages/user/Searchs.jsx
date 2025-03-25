import { Post } from "../../components/App/Post";
import profilDefault from "../../../public/images/profilDefault.png";
import { Button } from "../../components/UI/Button";
import { AppSelector } from "../../selectors/AppSelector";
import { Link } from "react-router-dom";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const Searchs = () => {
  const { resultSearch } = AppSelector();
  const className =
    "border text-gray-700 border-gray-400 !rounded-2xl cursor-pointer hover:bg-gray-200 hover:outline-2";

  return (
    <div className="relative top-[56px]">
      <div className="bg-white border-t fixed w-full z-20 border-t-gray-300 h-[60px] shadow-lg flex items-center justify-center lg:justify-start gap-2 px-[10%]">
        <Button text="Posts" className={className} />
        <Button text="People" className={className} />
        <Button text="Jobs" className={className} />
      </div>
      <div className="flex justify-center gap-[1%]">
        <div className="bg-white hidden lg:block rounded-lg border border-gray-300 w-[15%] left-[10%] mt-20 fixed ">
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
        <div className="w-full lg:w-[40%] flex flex-col gap-4 mt-20 lg:relative">
          <div className="rounded-lg">
            <h3 className="bg-white rounded-t-lg p-4 font-semibold text-xl">
              Posts
            </h3>
            <div className="flex flex-col gap-2">
              {resultSearch.posts.length &&
                resultSearch.posts.map((item) => (
                  <div className="bg-white">
                    <Post post={item} />
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <h3 className="p-4 font-semibold text-xl">People</h3>
            {resultSearch.users.length &&
              resultSearch.users.map((item, index) => {
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
                      <Button
                        text="follow"
                        className="border-2 text-[#0A66C2] border-[#0A66C2] !rounded-2xl px-5 cursor-pointer hover:bg-blue-100"
                      />
                    </div>
                    <hr
                      className={
                        index + 1 === resultSearch.users.length
                          ? "hidden"
                          : "ml-23 text-gray-300"
                      }
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

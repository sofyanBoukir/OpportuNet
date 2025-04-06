import { useNavigate } from "react-router-dom";
import React from "react"
import { AppSelector } from "../../selectors/AppSelector";

export const SingleLink = ({ link, svg, text }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const { notifiedTimes,messagedTimes } = AppSelector()

  return (
    <div
      onClick={() => {
        navigate(link);
      }}
      className={`${
        link === currentPath ? "text-black dark:text-white sm:border-b-2" : null
      } w-[60px] flex flex-col items-center justify-center cursor-pointer hover:text-gray-200 dark:hover:text-gray-800 duration-200`}
    >
      <div
        className={`mt-[3px] duration-200 relative ${
          link === currentPath ? "text-black dark:text-white" : "dark:text-gray-400 text-[#666666]"
        }`}
      >
        {
          text === 'Messaging' && messagedTimes.length > 0 &&  <div className="w-5 h-5 text-center text-white dark:text-black bg-red-600 absolute flex items-center justify-center rounded-full top-[-7px] right-[-10px] text-[13px]">{messagedTimes.length }</div>
        }
        {
          text === 'Notifications' &&  notifiedTimes !== 0 && <div className="w-5 h-5 text-center text-white dark:text-black bg-red-600 absolute flex items-center justify-center rounded-full top-[-7px] right-[-10px] text-[13px]">{notifiedTimes > 9 ? "+9" : notifiedTimes }</div>
        }
        {svg}
      </div>
      <div>
        <span
          className={`text-xs duration-200 font-normal hidden lg:block ${
            link === currentPath ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-100"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

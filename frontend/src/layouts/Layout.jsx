import { Input } from "../components/UI/Input";
import {
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { SingleLink } from "../components/UI/SingleLink";
import { dataHeader } from "../constants/Links";
import { AppSelector } from "../selectors/AppSelector";
import { useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import socket from "../functions/socket";
import { useDispatch } from "react-redux";
import ExtraLoader from "../components/UI/ExtraLoader";
import { SearchModal } from "../components/modals/SearchModal";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const Layout = () => {
  const [showProfil, setShowProfil] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const { userData } = AppSelector();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const dispatch = useDispatch();
  const { notifiedTimes, messagedTimes } = AppSelector();

  const notifiedTimesRef = useRef(notifiedTimes);
  const messagedTimesRef = useRef(messagedTimes);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    notifiedTimesRef.current = notifiedTimes;
  }, [notifiedTimes]);

  useEffect(() => {
    messagedTimesRef.current = messagedTimes;
  }, [messagedTimes]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const showProfil_FUNCTION = (e) => {
    e.stopPropagation();
    showProfil === false ? setShowProfil(true) : setShowProfil(false);
  };

  const notificationSound = new Audio("/public/audios/notificationSound.wav");
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();

      socket.on("connect", () => {
        // console.log("connected to the server");
      });
      socket.emit("registerUser", localStorage.getItem("token"));

      socket.on("missedNotifications", (missedNotifications) => {
        dispatch({
          type: "UPDATE_NOTIFIED_TIMES",
          payload: missedNotifications.length,
        });
      });

      socket.on("missedMessages", (missedMessages) => {
        dispatch({
          type: "UPDATE_MESSAGED_TIMES",
          payload: missedMessages.length,
        });
      });

      socket.on("newMessage", () => {
        dispatch({
          type: "UPDATE_MESSAGED_TIMES",
          payload: messagedTimesRef.current + 1,
        });
        notificationSound.play();
      });

      socket.on("newNotification", () => {
        dispatch({
          type: "UPDATE_NOTIFIED_TIMES",
          payload: notifiedTimes + 1,
        });
        notificationSound.play();
      });
    }

    const handleBeforeUnload = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.disconnect();
    };
  }, [dispatch]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div>
        <div
          className="bg-white dark:bg-black py-1 lg:px-[10%] flex w-[100%] justify-between fixed z-20"
          onClick={() => {
            setShowProfil(false);
            setOpenSearchModal(false);
          }}
        >
          <div
            className={`w-full lg:w-[40%] ${
              openSearchModal && "lg:w-[45%] duration-500"
            } relative`}
          >
            <div
              className={`w-[60px] flex justify-center mt-[3px] absolute left-[48px] top-[12px]`}
            >
              <MagnifyingGlassIcon
                strokeWidth="2"
                className="w-5 h-5 text-gray-700"
              />
            </div>
            <div className={`w-full h-full flex items-center gap-2 p-1`}>
              <img
                src="../../public/images/scren.png"
                alt="logo"
                className="w-[50px] h-[40px]"
              />
              <Input
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSearchModal(true);
                }}
                onChange={handleSearchInput}
                placeholder="Search"
                className={` pl-[32px] py-2 w-[90%] ${
                  openSearchModal && "!w-full duration-500 border-2"
                } my-auto outline-none rounded-md bg-[#F2F2F2] dark:bg-[#0D1117] dark:text-gray-100`}
              />
            </div>
          </div>
          <div className="bg-white dark:bg-black w-full lg:w-[50%] h-[70px] lg:h-auto fixed lg:static bottom-0 flex sm:justify-center gap-8">
            {dataHeader
              .filter((item) => item.ROLE === userData.role)
              .map((element) => (
                <SingleLink
                  key={element.LINK}
                  link={element.LINK}
                  svg={element.SVG}
                  text={element.TEXT}
                />
              ))}
            <div
              className={`w-[60px] flex flex-col items-center justify-center mt-[3px] cursor-pointer`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {!darkMode ? (
                <MoonIcon className="w-7 h-7 text-[#666666]" />
              ) : (
                <SunIcon className="w-7 h-7 text-gray-400" />
              )}
              <div className="text-xs font-normal hidden lg:block text-gray-600 dark:text-gray-100">
                {!darkMode ? "Dark" : "Light"}
              </div>
            </div>
            <div
              className={`w-[60px] flex flex-col items-center justify-center mt-[3px] cursor-pointer`}
              onClick={showProfil_FUNCTION}
            >
              <img
                src={userData.profilePictureUrl}
                className="w-7 h-7 rounded-full mt-0.5"
              />
              <div className="text-xs font-normal hidden lg:block dark:text-gray-100 text-gray-600 2xl:block">
                Profile
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            showProfil ? "block" : "hidden"
          } w-[400px] py-2 px-3 rounded-xl shadow-lg flex flex-col bg-white fixed md:left-[65%] rounded-tr-none md:top-[75px] z-40 dark:bg-black dark:text-white`}
        >
          <div className="flex items-center gap-2">
            <div>
              <img
                src={`${serverURL}` + userData.profile_picture}
                className="rounded-full w-16 h-16"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{userData.name}</p>
              <span className="text-gray-700 dark:text-gray-500">
                {userData.headLine}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <button
              onClick={() => {
                setShowProfil(false);
                navigate(`/user/profile/${userData._id}`);
              }}
              className="rounded-2xl font-semibold w-[100%] cursor-pointer border-2 border-blue-600 text-[#0A66C2] bg-gray-100 hover:bg-blue-50 duration-200 dark:bg-black dark:hover:bg-gray-950"
            >
              View profile
            </button>
          </div>
          <div className="mt-2">
            <hr className="text-gray-300"></hr>
          </div>
          <div className="mt-2 flex gap-2 flex-col">
            <div className="flex gap-2 items-center py-1 rounded-md cursor-pointer px-2 hover:bg-gray-100 duration-200 dark:hover:bg-gray-900">
              <ArrowRightOnRectangleIcon
                className="w-6 h-6 text-gray-700 dark:text-white"
                strokeWidth={1.1}
              />
              <span className="text-gray-700 text-lg dark:text-white">
                Sign out
              </span>
            </div>
          </div>
        </div>

        {openSearchModal && (
          <SearchModal
            query={searchInput}
            openSearchModal={setOpenSearchModal}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};

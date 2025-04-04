import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FlagIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const dataSideBar = [
    {
      SVG: <UserGroupIcon strokeWidth="1.5" className="w-7 h-7" />,
      TEXT: "Manage Users",
      LINK: "/admin/users",
    },
    {
      SVG: <UserIcon strokeWidth="1.5" className="w-7 h-7" />,
      TEXT: "Admins",
      LINK: "/admin/admins",
    },
    {
      SVG: <FlagIcon strokeWidth="1.5" className="w-7 h-7" />,
      TEXT: "Reported posts",
      LINK: "/admin/posts",
    },

    {
      SVG: <ArrowRightOnRectangleIcon strokeWidth="1.5" className="w-7 h-7" />,
      TEXT: "Logout",
    },
  ];
  return (
    <div
      onClick={() => {
        setIsMenuOpen(false);
      }}
      className="w-[100%] h-[100vh] flex flex-col sm:flex-row"
    >
      <div className="w-full h-[45px] relative flex items-center sm:hidden shadow-[0_0_1px_rgba(0,0,0,0.5)] ">
        <Bars3Icon
          className={`w-[25px] h-[25px] ml-3 ${isMenuOpen && "hidden"}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(true);
          }}
        />
      </div>
      {dataSideBar && dataSideBar.length > 0 && (
        <div
          className={`z-15 bg-dark bg-gray-200 shadow-lg font-[Poppins,sans-serif] w-[80%] 2xl:w-[14%] md:w-[250px] flex flex-col pl-1 absolute sm:translate-x-0 duration-500 ${
            !isMenuOpen && "-translate-x-full"
          } sm:fixed sm:h-[100%] sm:justify-start gap-5 py-10`}
        >
          {dataSideBar.map((item) => {
            return (
              <div
                key={item.LINK}
                onClick={() => {
                  item.TEXT !== "Logout"
                    ? navigate(item.LINK)
                    : console.log(item.TEXT);
                }}
                className={`${
                  item.LINK === currentPath ? "text-blue-500" : null
                } flex gap-4 px-2 items-center cursor-pointer hover:text-blue-500 duration-200 rounded-lg`}
              >
                <div>{item.SVG}</div>
                <div>
                  <span className="text-2xl font-normal lg:block">
                    {item.TEXT}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* <div className="sm:relative md:pl-[250px] w-full md:w-[86%]"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
};

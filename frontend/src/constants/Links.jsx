import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import { AiFillHome } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa6";
import { TbMessageFilled } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import { BookmarkIcon } from "@heroicons/react/24/solid";
// import { BookmarkIcon } from "@heroicons/react/24/outline";
import React from "react"
export const dataHeader = [
  {
    ROLE: "candidate",
    SVG: <AiFillHome strokeWidth="1" className="w-7 h-7" />,
    TEXT: "Home",
    LINK: `/feed`,
  },
  {
    ROLE: "candidate",
    SVG: <FaBriefcase strokeWidth="1" className="w-7 h-7" />,
    TEXT: "Jobs",
    LINK: `/candidate/jobs`,
  },
  {
    ROLE: "candidate",
    SVG: <TbMessageFilled strokeWidth="1" className="w-7 h-7" />,
    TEXT: "Messaging",
    LINK: `/messaging`,
  },
  {
    ROLE: "candidate",
    SVG: <BookmarkIcon strokeWidth="1" className="w-7 h-7" />,
    TEXT: "Saves",
    LINK: `/saves`,
  },
  {
    ROLE: "candidate",
    SVG: <IoNotifications strokeWidth="1" className="w-7 h-7" />,
    TEXT: "Notifications",
    LINK: `/notifications`,
  },
  {
    ROLE: "recuiter",
    SVG: <HomeIcon strokeWidth="1" className="w-7 h-7"/>,
    TEXT: "Home",
    LINK: `/feed`,
  },
  {
    ROLE: "recuiter",
    SVG: <WorkIcon strokeWidth="1" className="w-7 h-7"/>,
    TEXT: "Post",
    LINK: `/recuiter/post`,
  },
  {
    ROLE: "recuiter",
    SVG: <ForumIcon strokeWidth="1" className="w-7 h-7"/>,
    TEXT: "Messaging",
    LINK: `/messaging`,
  },
  {
    ROLE: "recuiter",
    SVG: <BookmarkIcon strokeWidth="1" className="w-7 h-7"/>,
    TEXT: "Saved",
    LINK: `/saved`,
  },
  {
    ROLE: "recuiter",
    SVG: <NotificationsIcon strokeWidth="1" className="w-7 h-7"/>,
    TEXT: "Notifications",
    LINK: `/notifications`,
  },
];

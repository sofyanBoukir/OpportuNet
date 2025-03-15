import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import { AiFillHome } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa6";
import { TbMessageFilled } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
// import { BookmarkIcon } from "@heroicons/react/24/outline";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const dataHeader = [
  {
    ROLE: "candidate",
    SVG: <AiFillHome strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Home",
    LINK: `/feed`,
  },
  {
    ROLE: "candidate",
    SVG: <FaBriefcase strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Jobs",
    LINK: `/candidate/jobs`,
  },
  {
    ROLE: "candidate",
    SVG: <TbMessageFilled strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Messaging",
    LINK: `/messaging`,
  },
  {
    ROLE: "candidate",
    SVG: <IoNotifications strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Notifications",
    LINK: `/notifications`,
  },
  {
    ROLE: "candidate",
    SVG: <BookmarkIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Savs",
    LINK: `/saves`,
  },
  {
    ROLE: "recuiter",
    SVG: <HomeIcon strokeWidth="1" />,
    TEXT: "Home",
    LINK: `/feed`,
  },
  {
    ROLE: "recuiter",
    SVG: <WorkIcon strokeWidth="1" />,
    TEXT: "Post",
    LINK: `/recuiter/post`,
  },
  {
    ROLE: "recuiter",
    SVG: <ForumIcon strokeWidth="1" />,
    TEXT: "Messaging",
    LINK: `/messaging`,
  },
  {
    ROLE: "recuiter",
    SVG: <NotificationsIcon strokeWidth="1" />,
    TEXT: "Notifications",
    LINK: `/notifications`,
  },
  {
    ROLE: "recuiter",
    SVG: <BookmarkIcon strokeWidth="1" />,
    TEXT: "Saved",
    LINK: `/saved`,
  },
];

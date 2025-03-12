import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { AppSelector } from "../selectors/AppSelector";
import { Outlet } from "react-router-dom";

export const dataHeader = [
  {
    ROLE: "condidate",
    SVG: <HomeIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Home",
    LINK: `/condidate/home`,
  },
  {
    ROLE: "condidate",
    SVG: <WorkIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Jobs",
    LINK: `/condidate/jobs`,
  },
  {
    ROLE: "condidate",
    SVG: <ForumIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Messaging",
    LINK: `/condidate/messaging`,
  },
  {
    ROLE: "condidate",
    SVG: <NotificationsIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Notifications",
    LINK: `/condidate/notifications`,
  },
  {
    ROLE: "condidate",
    SVG: <BookmarkIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Saved",
    LINK: `/condidate/saved/{id}`,
  },
  {
    ROLE: "recuiter",
    SVG: <HomeIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Home",
    LINK: `/recuiter/home`,
  },
  {
    ROLE: "recuiter",
    SVG: <WorkIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Jobs",
    LINK: `/recuiter/post`,
  },
  {
    ROLE: "recuiter",
    SVG: <ForumIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Messaging",
    LINK: `/recuiter/messaging`,
  },
  {
    ROLE: "recuiter",
    SVG: <NotificationsIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Notifications",
    LINK: `/recuiter/notifications`,
  },
  {
    ROLE: "recuiter",
    SVG: <BookmarkIcon strokeWidth="1" className="w-10 h-10" />,
    TEXT: "Saved",
    LINK: `/recuiter/saved/{id}`,
  },
];

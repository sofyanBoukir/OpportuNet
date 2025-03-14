import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const dataHeader = [
  {
    ROLE: "condidate",
    SVG: <HomeIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Home",
    LINK: `/condidate/home`,
  },
  {
    ROLE: "condidate",
    SVG: <WorkIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Jobs",
    LINK: `/condidate/jobs`,
  },
  {
    ROLE: "condidate",
    SVG: <ForumIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Messaging",
    LINK: `/condidate/messaging`,
  },
  {
    ROLE: "condidate",
    SVG: <NotificationsIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Notifications",
    LINK: `/condidate/notifications`,
  },
  {
    ROLE: "condidate",
    SVG: <BookmarkIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Saved",
    LINK: `/condidate/saved/{id}`,
  },
  {
    ROLE: "recuiter",
    SVG: <HomeIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Home",
    LINK: `/recuiter/home`,
  },
  {
    ROLE: "recuiter",
    SVG: <WorkIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Jobs",
    LINK: `/recuiter/post`,
  },
  {
    ROLE: "recuiter",
    SVG: <ForumIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Messaging",
    LINK: `/recuiter/messaging`,
  },
  {
    ROLE: "recuiter",
    SVG: <NotificationsIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Notifications",
    LINK: `/recuiter/notifications`,
  },
  {
    ROLE: "recuiter",
    SVG: <BookmarkIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Saved",
    LINK: `/recuiter/saved/{id}`,
  },
];

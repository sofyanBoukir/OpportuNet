import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const dataHeader = [
  {
    ROLE: "candidate",
    SVG: <HomeIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Home",
    LINK: `/feed`,
  },
  {
    ROLE: "candidate",
    SVG: <WorkIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Jobs",
    LINK: `/candidate/jobs`,
  },
  {
    ROLE: "candidate",
    SVG: <ForumIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Messaging",
    LINK: `/candidate/messaging`,
  },
  {
    ROLE: "candidate",
    SVG: <NotificationsIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Notifications",
    LINK: `/candidate/notifications`,
  },
  {
    ROLE: "candidate",
    SVG: <BookmarkIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Saved",
    LINK: `/candidate/saved/{id}`,
  },
  {
    ROLE: "recuiter",
    SVG: <HomeIcon strokeWidth="1" className="w-full h-full" />,
    TEXT: "Home",
    LINK: `/feed`,
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

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { AppSelector } from "../selectors/AppSelector";

// const { userData } = AppSelector();
// console.log("userdata", userData);
const userRole = () => {
  const { userData } = AppSelector();
  return userData.role;
};
// const role = userRole();

const role = "recruteur";

export const dataHeader = [
  {
    // ROLE: "admin",
    SVG: <HomeIcon strokeWidth="1" className="w-10 h-10 text-gray-600" />,
    TEXT: "Home",
    LINK: `/${role}/home`,
  },
  {
    // ROLE: "admin",
    SVG: <WorkIcon strokeWidth="1" className="w-10 h-10 text-gray-600" />,
    TEXT: role == "recruteur" ? "post" : "Jobs",
    LINK: `/${role}/jobs`,
  },
  {
    // ROLE: "admin",
    SVG: <ForumIcon strokeWidth="1" className="w-10 h-10 text-gray-600" />,
    TEXT: "Messaging",
    LINK: `/${role}/messaging`,
  },
  {
    // ROLE: "admin",
    SVG: (
      <NotificationsIcon strokeWidth="1" className="w-10 h-10 text-gray-600" />
    ),
    TEXT: "Notifications",
    LINK: `/${role}/notifications`,
  },
  {
    // ROLE: "admin",
    SVG: <BookmarkIcon strokeWidth="1" className="w-10 h-10 text-gray-600" />,
    TEXT: "Saved",
    LINK: `/${role}/saved/{id}`,
  },
];

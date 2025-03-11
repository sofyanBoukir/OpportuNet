import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ForumIcon from "@mui/icons-material/Forum";

const role = "recruteur";

const currentPath = window.location.pathname;

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
  //   {
  //     // ROLE: "admin",
  //     SVG: <UserIcon strokeWidth="1" className="w-6 h-6" />,
  //     TEXT: "Profil   ",
  //     LINK: `/${role}/Profil`,
  //   },
];

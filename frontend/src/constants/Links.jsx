import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
const role = "recruteur";

export const dataHeader = [
  {
    // ROLE: "admin",
    SVG: <HomeIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Home",
    LINK: `/${role}/home`,
  },
  {
    // ROLE: "admin",
    SVG: <BriefcaseIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Jobs",
    LINK: `/${role}/jobs`,
  },
  {
    // ROLE: "admin",
    SVG: <ChatBubbleLeftEllipsisIcon strokeWidth="1" className="w-6 h-6" />,
    TEXT: "Messaging",
    LINK: `/${role}/messaging`,
  },
  {
    // ROLE: "admin",
    SVG: <BellIcon strokeWidth="1" className="w-6 h-6" />,
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

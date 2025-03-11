import { LinkSlashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SingleLink = ({ link, svg, text }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  //   const [showBorder, setShowBorder] = useState(false);
  //   const refDiv = useRef("");

  //   const showBorder_FUNCTION = () => {
  //     refDiv.current.id === text:
  //     showProfil === false ? setShowProfil(true) : setShowProfil(false);
  //   };

  return (
    <div
      onClick={() => {
        navigate(link);
      }}
      className={`${
        link === currentPath ? "text-black sm:border-b-2" : null
      } w-[60px] flex flex-col items-center justify-center cursor-pointer hover:text-gray-200) duration-200`}
    >
      <div className="mt-[3px]">{svg}</div>
      <div>
        <span
          className={`text-sm font-semiboldbold hidden lg:block ${
            link === currentPath ? "text-black" : "text-gray-600"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

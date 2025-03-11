import { LinkSlashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

export const SingleLink = ({ link, svg, text }) => {
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
        console.log(link);
      }}
      className={`${
        link === currentPath ? "text-blue-500" : null
      } w-[60px] sm:border-b-2 flex flex-col items-center justify-center cursor-pointer hover:text-blue-500 duration-200`}
    >
      <div className="mt-[3px]">{svg}</div>
      <div>
        <span className="text-sm font-light hidden lg:block">{text}</span>
      </div>
    </div>
  );
};

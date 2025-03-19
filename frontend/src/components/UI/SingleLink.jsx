import { useNavigate } from "react-router-dom";
import React from "react"

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
        console.log(link);
      }}
      className={`${
        link === currentPath ? "text-black sm:border-b-2" : null
      } w-[60px] flex flex-col items-center justify-center cursor-pointer hover:text-gray-200 duration-200`}
    >
      <div
        className={`mt-[3px] duration-200 relative ${
          link === currentPath ? "text-black" : " text-[#666666]"
        }`}
      >
        {
          (text === 'Notifications' || text === 'Messaging') && <div className="w-5 h-5 text-center text-white bg-red-600 absolute rounded-full top-[-8px] right-[-10px] text-sm">1</div>
        }
        {svg}
      </div>
      <div>
        <span
          className={`text-xs duration-200 font-normal hidden lg:block ${
            link === currentPath ? "text-black" : "text-gray-600"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

// export const Selector = () => {
//   const user = useSelector((state) => state.userData);
//   return user;
// };

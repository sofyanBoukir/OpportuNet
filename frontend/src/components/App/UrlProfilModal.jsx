import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const UrlProfilModal = ({ showIcon }) => {
  return (
    <div className="p-[10px] !pl-6 bg-white w-full lg:w-[20%] lg:rounded-lg lg:fixed lg:top-[80px] lg:left-[66.5%] z-15">
      <div>
        {showIcon && (
          <span className="float-end w-[35px] h-[35px] text-center p-[1.5px] text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%]">
            <ModeEditOutlinedIcon />
          </span>
        )}

        <h1 className="font-semibold text-xl">Profile URL as Linkedin</h1>
      </div>
      <h6 className="font-light text-md text-gray-700">aaaaaaaaaaa</h6>
    </div>
  );
};

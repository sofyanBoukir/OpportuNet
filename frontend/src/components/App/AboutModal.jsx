import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const AboutModal = ({ showIcon, content }) => {
  return (
    <div className="bg-white w-full lg:w-[55%] pb-[1px]) p-[30px] lg:ml-[10%] relative lg:rounded-md z-15">
      {showIcon && (
        <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[35px] h-[35px] text-center p-[1.5px] text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
          <ModeEditOutlinedIcon />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p>{content}</p>
    </div>
  );
};

import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const AboutModal = ({ content }) => {
  return (
    <div className="p-[30px] bg-white w-full 2xl:w-[65%] h-auto 2xl:rounded-lg absolute top-[345px] md:top-[390px] 2xl:top-[444px] left-0 2xl:left-5 z-15">
      <div className="absolute right-0 top-[5px] mt-4 mr-5 w-[30px] h-[30px] text-center pt-1 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] ">
        <ModeEditOutlinedIcon />
      </div>
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <p>{content}</p>
    </div>
  );
};

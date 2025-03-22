import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

export const AboutModal = ({
  valuetoUpdate,
  setShowModalUpdate,
  showIcon,
  content,
}) => {
  return (
    <div className="bg-white w-full lg:w-[89%] p-[30px] lg:ml-[15%] relative lg:rounded-md">
      {showIcon && (
        <div
          onClick={() => {
            setShowModalUpdate(true);
            valuetoUpdate("about");
          }}
          className="absolute right-0 top-[5px] mt-4 mr-5 p-1.5 duration-200 text-center text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black rounded-[50%] "
        >
          <ModeEditOutlinedIcon />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">About</h2>
      <p>{content}</p>
    </div>
  );
};

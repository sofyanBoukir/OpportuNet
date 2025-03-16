export const SuggestionsModal = ({ suggestionList }) => {
  return (
    <div className="p-[10px] bg-white w-full lg:w-full lg:rounded-lg z-10">
      {suggestionList.map((item) => (
        <div className="p-2 w-full h-[120px] flex gap-2 relative border-b border-b-gray-300">
          <div className="w-[60px] h-[60px] pt-1">
            <img
              src="../../public/images/profilDefault.png"
              className="w-full h-full rounded-[50%] m-auto"
            />
          </div>
          <div className="w-[70%] h-[45%] pt-1">
            <h1 className="font-semibold text-xl">{item.sugName}</h1>
            <h6 className="font-normal text-md text-gray-700">
              {item.sugHead}
            </h6>
          </div>
          <button className="font-semibold absolute border-2 border-gray-700 text-gray-700 w-[100px] rounded-2xl top-[70px] left-[80px] text-center cursor-pointer hover:bg-gray-100 hover:text-black hover:border-black hover:border-2 hover:font-medium">
            followe
          </button>
        </div>
      ))}
    </div>
  );
};

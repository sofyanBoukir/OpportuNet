export const IsEmptyModal = ({ type, setShowModalAdd, valuetoAdd }) => {
  return (
    <div className="bg-white w-full h-[110px] lg:w-[89%] p-[10px] lg:ml-[15%] relative lg:rounded-md z-15">
      <div className="border-2 border-dashed border-gray-400 w-full h-full flex items-center justify-center">
        <h2
          onClick={() => {
            setShowModalAdd(true);
            valuetoAdd(type);
          }}
          className="border-2 border-dashed border-gray-400 font-semibold text-lg text-gray-600 px-20 p-1 hover:border-gray-600 hover:text-gray-900 cursor-pointer"
        >
          {`Add ${type}`}
        </h2>
      </div>
    </div>
  );
};

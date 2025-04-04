export const Pagination = ({ currentPage, lastPage, previus, next, total }) => {
  return (
    <div className="flex justify-between mt-2">
      <div>
        <span className="font-semibold">
          Total:{total}, Showing {currentPage} from {lastPage} pages
        </span>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-inherit border-2 border-[#0A66C2] px-3 py-1 rounded-md hover:bg-blue-200 cursor-pointer text-sm font-semibold"
          onClick={() => previus()}
        >
          Previus
        </button>
        <button
          className="bg-[#0A66C2] border-2 text-white rounded-md border-[#0A66C2] px-3 py-1 hover:bg-blue-600 cursor-pointer text-sm font-semibold"
          onClick={() => next()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

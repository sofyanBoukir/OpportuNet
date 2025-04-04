import moment from "moment";
import { ButtonSvg } from "../UI/ButtonSvg";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DeleteModal } from "../modals/DeleteModal";
import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

export const Table = ({ heads, data, keys }) => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div>
      <table className="w-[100%] border-2 border-gray-400 shadow-md">
        <thead>
          {
            <tr className="bg-gray-300">
              {heads && heads.length
                ? heads.map((head) => {
                    return (
                      <th key={head} className="py-2">
                        {head}
                      </th>
                    );
                  })
                : null}
              <th>Actions</th>
            </tr>
          }
        </thead>
        <tbody>
          {data && data.length
            ? data.map((dataVar, rowIndex) => (
                <tr key={rowIndex} className="bg-gray-50">
                  {keys &&
                    keys.map((key, colIndex) => (
                      <td key={colIndex} className="py-1 text-center">
                        {key
                          .split(".")
                          .reduce((obj, prop) => obj?.[prop], dataVar)}
                      </td>
                    ))}
                  {
                    <td className="flex space-x-2 justify-center">
                      <ButtonSvg
                        svg={<EyeIcon className="w-5 h-5 text-white" />}
                        color={"green"}
                        onclick={() => {
                          console.log("fffftablz");
                        }}
                      />

                      <ButtonSvg
                        svg={<TrashIcon className="w-5 h-5 text-white" />}
                        color={"red"}
                        onclick={() => {
                          setOpenDelete(true);
                        }}
                      />
                    </td>
                  }
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {/* {pagination && paginate && (
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          total={pagination.total}
          next={nextData}
          previus={prevData}
        />
      )} */}

      {/* {modal.type === "view" && navigate("/user/{}")} */}
      {openDelete && <DeleteModal setOpen={setOpenDelete} />}
    </div>
  );
};

import { ButtonSvg } from "../UI/ButtonSvg";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DeleteModal } from "../modals/DeleteModal";
import { useEffect, useState } from "react";
import { Pagination } from "../UI/Pagination";
import { Notification } from "../UI/Notification";
import { deleteReportPosts, deleteUser } from "../../services/admin";
import { useNavigate } from "react-router-dom";

export const Table = ({
  heads,
  data,
  keys,
  chowBtnDetail,
  pagination,
  getData,
  toDelete,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [idForDelete, setIdForDelete] = useState(null);
  const [notification, setNotification] = useState({});
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const nextData = async () => {
    if (pagination.lastPage <= pagination.currentPage) {
      return;
    }
    await getData(pagination.currentPage + 1);
  };

  const prevData = async () => {
    if (pagination.currentPage == 1) {
      return;
    }
    await getData(pagination.currentPage - 1);
  };

  const _delete_Function = async () => {
    setNotification(null);
    setLoadingDelete(true);
    try {
      let response;
      switch (toDelete) {
        case "user":
          response = await deleteUser(
            localStorage.getItem("token"),
            idForDelete
          );
          setLoadingDelete(false);
          setOpenDelete(false);
          setNotification({ type: "success", message: response.data.message });
          break;
        case "post":
          response = await deleteReportPosts(
            localStorage.getItem("token"),
            idForDelete
          );
          setLoadingDelete(false);
          setOpenDelete(false);
          setNotification({ type: "success", message: response.data.message });
          break;
      }
    } catch (error) {
      setLoadingDelete(false);
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({
            type: "error",
            message: ERROR_MESSAGES.TRY_AGAIN,
          });
    }
  };
  useEffect(() => {
    setNotification(null);
  }, []);

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
                        {key === "followers"
                          ? dataVar.followers.length
                          : key
                              .split(".")
                              .reduce((obj, prop) => obj?.[prop], dataVar)}
                      </td>
                    ))}
                  {
                    <td className="flex space-x-2 justify-center">
                      {chowBtnDetail && (
                        <ButtonSvg
                          svg={<EyeIcon className="w-5 h-5 text-white" />}
                          color={"green"}
                          onclick={() => {
                            navigate(
                              `/admin/${
                                toDelete === "user" ? "profile" : "post"
                              }/${dataVar._id}`
                            );
                          }}
                        />
                      )}

                      <ButtonSvg
                        svg={<TrashIcon className="w-5 h-5 text-white" />}
                        color={"red"}
                        onclick={() => {
                          setOpenDelete(true);
                          setIdForDelete(dataVar._id);
                        }}
                      />
                    </td>
                  }
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          total={pagination.total}
          next={nextData}
          previus={prevData}
        />
      )}

      {/* {modal.type === "view" && navigate("/user/{}")} */}
      {openDelete && (
        <DeleteModal
          deleteItem={_delete_Function}
          itemType={toDelete}
          loading={loadingDelete}
          setOpen={setOpenDelete}
        />
      )}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

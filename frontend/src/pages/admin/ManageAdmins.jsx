import { useEffect, useState } from "react";
import { Table } from "../../components/tables/Table";
import { getAdmins } from "../../services/admin";
import { Notification } from "../../components/UI/Notification";
import { Table as TableSkeletons } from "../../components/skeletons/Table";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { AddAdminModal } from "../../components/modals/AddAdminModal";

export const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: "",
    lastPage: "",
    total: "",
  });

  const getAllAdmins = async (page) => {
    setNotification(null);
    setLoading(true);
    try {
      const response = await getAdmins(localStorage.getItem("token"), page);
      setLoading(false);
      setAdmins(response.data.admins);
      setPagination({
        currentPage: page,
        lastPage: response.data.totalPages,
        total: response.data.totalAdmins,
      });
    } catch (error) {
      setLoading(false);
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
    getAllAdmins(1);
  }, []);

  return (
    <div>
      <div className="w-[100%] px-2">
        <div className="flex justify-between mb-5">
          <h1 className="text-3xl font-semibold">Manage admins</h1>
          <button
            onClick={() => setOpenAdmin(true)}
            className="px-3 py-1 rounded-md duration-200 cursor-pointer bg-[#0A66C2] hover:bg-blue-600 text-white font-semibold text-ms"
          >
            Add admin
          </button>
        </div>
        {loading && <TableSkeletons />}
        {!loading && admins.length > 0 ? (
          <Table
            heads={["name", "role", "email"]}
            data={admins}
            keys={["name", "role", "email"]}
            pagination={pagination}
            getData={getAllAdmins}
            toDelete={"user"}
          />
        ) : (
          <span className="text-red-300 text-xl font-semibold">
            {ERROR_MESSAGES.NOT_FOUND}
          </span>
        )}
      </div>
      {openAdmin && <AddAdminModal setOpen={setOpenAdmin} />}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

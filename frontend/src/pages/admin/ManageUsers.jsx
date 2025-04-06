import { useEffect, useState } from "react";
import { Table } from "../../components/tables/Table";
import { getUsers } from "../../services/admin";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { Notification } from "../../components/UI/Notification";
import { Table as TableSkeletons } from "../../components/skeletons/Table";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: "",
    lastPage: "",
    total: "",
  });

  const getAllUsers = async (page) => {
    setNotification(null);
    setLoading(true);
    try {
      const response = await getUsers(localStorage.getItem("token"), page);
      setLoading(false);
      setUsers(response.data.users);
      setPagination({
        currentPage: page,
        lastPage: response.data.totalPages,
        total: response.data.totalUsers,
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
    getAllUsers(1);
  }, []);

  return (
    <div>
      <div className="w-[100%] px-2 ">
        <h1 className="text-3xl font-semibold pb-5">Manage users</h1>
        {loading && <TableSkeletons />}

        {!loading && users.length > 0 ? (
          <Table
            heads={["name", "role", "followers", "location"]}
            data={users}
            keys={["name", "role", "followers", "location"]}
            pagination={pagination}
            getData={getAllUsers}
            toDelete={"user"}
            chowBtnDetail
          />
        ) : (
          <span className="text-red-500 text-xl font-semibold">
            {ERROR_MESSAGES.NOT_FOUND}
          </span>
        )}
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

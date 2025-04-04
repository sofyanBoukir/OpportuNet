import { useEffect, useState } from "react";
import { Table } from "../../components/tables/Table";
import { getUsers } from "../../services/admin";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { Notification } from "../../components/UI/Notification";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  useEffect(() => {
    const getAllUsers = async () => {
      setNotification(null);
      setLoading(true);
      try {
        const response = await getUsers(localStorage.getItem("token"));
        setLoading(false);
        setUsers(response.data.users);
      } catch (error) {
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

    getAllUsers();
  }, []);

  return (
    <div className="w-full md:w-[100%] mt-6 md:pl-[255px] 2xl:pl-[15%] sm:relative ">
      <div className="w-[100%] px-2 ">
        <h1 className="text-3xl font-semibold pb-5">Manage users</h1>
        <Table
          heads={["name", "role", "followers", "location"]}
          data={users}
          keys={["name", "role", "followers", "location"]}
        />
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

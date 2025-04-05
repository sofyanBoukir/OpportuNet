import React, { useEffect, useState } from "react";
import { Button } from "../UI/Button";
import { Notification } from "../UI/Notification";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { AddAdmin } from "../../services/admin";

export const AddAdminModal = ({ setOpen }) => {
  const [dataAdmin, setDataAdmin] = useState({});
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);
    try {
      const response = await AddAdmin(localStorage.getItem("token"), dataAdmin);
      setLoading(false);
      console.log(response);
      setNotification({ type: "success", message: response.data.message });
    } catch (err) {
      setLoading(false);
      err.response
        ? setNotification({ type: "error", message: err.response.data.message })
        : setNotification({ type: "error", message: ERROR_MESSAGES.TRY_AGAIN });
    }
  };
  useEffect(() => {
    setNotification(null);
  }, []);
  return (
    <div className="z-20 abso)lute fixed w-full inset-0 p-2 flex bg-black/50 text-gray-700 justify-center lg:backdrop-blur-xs">
      <div
        className={`bg-[#ffffff] z-20 border w-full sm:w-[65%] lg:w-[50%] my-auto lg:p-4 pb-4 px-8 rounded-lg shadow-sm`}
      >
        <div className="text-center sticky top-0 pt-2 pb-1 mb-1 bg-[#ffffff]">
          <h1 className="text-2xl font-semibold text-gray-800">Add admin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to Add admin
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-5">
            <Label
              text="FullName"
              className="text-sm font-normal text-gray-600 mb-1"
            />
            <Input
              type="text"
              placeholder="Ex:John"
              name="name"
              value={dataAdmin.name}
              onChange={handleChange}
              className="p-2 font-normal text-sm outline-2 rounded-xs"
            />
          </div>

          <div className="flex flex-col mt-5">
            <Label
              text="Email"
              className="text-sm font-normal text-gray-600 mb-1"
            />
            <Input
              type="text"
              placeholder="Ex:exemple@gmail.com"
              name="email"
              value={dataAdmin.email}
              onChange={handleChange}
              className="p-2 font-normal text-sm outline-2 rounded-xs"
            />
          </div>

          <div className="flex flex-col mt-5">
            <Label
              text="Password"
              className="text-sm font-normal text-gray-600 mb-1"
            />
            <Input
              type="password"
              placeholder="********"
              name="password"
              value={dataAdmin.password}
              onChange={handleChange}
              className="p-2 font-normal text-sm outline-2 rounded-xs"
            />
          </div>
          <div className="flex justify-end mr-4 gap-4 mt-7">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpen(false)}
              className="bg-gray-200 text-gray-900 w-15 !rounded-2xl"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Add"
              loading={loading}
              className="bg-[#004182] text-[#ffffff] w-15 !rounded-2xl"
            />
          </div>
        </form>
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

import { useState } from "react";
import { AppSelector } from "../../selectors/AppSelector";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";

export const UpdateModal = ({ userInfobeforUpdate, toUpdate, setOpen }) => {
  const { userData } = AppSelector();
  const [userInfo, setUserInfo] = useState({ ...userInfobeforUpdate });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    console.log(e);
    const { name, value, type, files } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const _toUpdate = "intro";

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="z-20 abso)lute fixed w-full inset-0 p-2 flex text-gray-700 justify-center lg:backdrop-blur-xs">
      <div className="bg-[#ffffff] z-20 border w-full sm:w-[65%] lg:w-[50%] h-[520px] sm:h-[540px] lg:h-[555px] my-auto lg:mt-[30px] px-8 rounded-lg shadow-sm overflow-auto">
        <div className="text-center sticky top-0 pt-6 pb-2 bg-[#ffffff]">
          <h1 className="text-2xl font-semibold text-gray-800">Edit intro</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to Edit intro
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col px-4">
            <div className="flex flex-col">
              <Label
                text="FullName*"
                className="text-sm font-normal text-gray-600 mb-1"
              />
              <Input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="p-2 font-normal text-sm outline-2 rounded-xs "
              />
            </div>
            <div className="flex flex-col mt-5">
              <Label
                text="Headline*"
                className="text-sm font-normal text-gray-600 mb-1"
              />
              <Input
                type="text"
                name="headeLine"
                value={userInfo.headeLine}
                onChange={handleChange}
                className="p-2 font-normal text-sm outline-2 rounded-xs "
              />
            </div>
            <div className="flex flex-col mt-5">
              <Label
                text="Photo Profil"
                className="text-sm font-normal text-gray-600 mb-1"
              />
              <Input
                type="file"
                name="profile_picture"
                onChange={handleChange}
                className="p-2 font-normal text-sm outline-2 rounded-xs "
              />
            </div>
            {userData.role === "recuiter" && (
              <div className="flex flex-col mt-5">
                <Label
                  text="Company"
                  className="text-sm font-normal text-gray-600 mb-1"
                />
                <Input
                  type="text"
                  name="companyName"
                  value={userInfo.companyName}
                  onChange={handleChange}
                  className="p-2 font-normal text-sm outline-2 rounded-xs "
                />
              </div>
            )}
            <div className="flex flex-col mt-5">
              <Label
                text="Adresse*"
                className="text-sm font-normal text-gray-600 mb-1"
              />
              <Input
                type="text"
                name="location"
                value={userInfo.location}
                onChange={handleChange}
                className="p-2 font-normal text-sm outline-2 rounded-xs "
              />
            </div>
            <div className="flex flex-col mt-5">
              <Label
                text="Link"
                className="text-sm font-normal text-gray-600 mb-1"
              />
              <Input
                type="text"
                name="webSite"
                value={userInfo.webSite}
                onChange={handleChange}
                className="p-2 font-normal text-sm outline-2 rounded-xs "
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-7">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpen(false)}
              className="bg-gray-200 text-gray-900 !rounded-2xl"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Save"
              loading={loading}
              className="bg-[#004182] text-[#ffffff] !rounded-2xl"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

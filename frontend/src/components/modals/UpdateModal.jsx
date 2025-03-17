import { useState } from "react";
import { AppSelector } from "../../selectors/AppSelector";
import { Input } from "../UI/Input";
import { Notification } from "../UI/Notification";
import { Textarea } from "../UI/Textarea";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";
import {
  updateAboutProfile,
  updateEducationProfile,
  updateIntroProfile,
} from "../../services/profile";
import { useDispatch } from "react-redux";

export const UpdateModal = ({ idSelaected, toUpdate, setOpen }) => {
  const { userData } = AppSelector();
  const [userInfo, setUserInfo] = useState({ ...userData });
  const [educationInfo, setEducationInfo] = useState({
    ...userData.education.filter((item) => item._id === idSelaected)[0],
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    toUpdate !== _education
      ? setUserInfo((prev) => ({
          ...prev,
          [name]: type === "file" ? files[0] : value,
        }))
      : setEducationInfo((prev) => ({
          ...prev,
          [name]: value,
        }));
  };

  const token = localStorage.getItem("token");
  const _intro = "intro";
  const _about = "about";
  const _education = "education";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setNotification(null);
    try {
      let response;
      switch (toUpdate) {
        case _intro:
          response = await updateIntroProfile(token, userInfo);
          setLoading(false);
          dispatch({ type: "UPDATE_USERDATA", payload: userInfo });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 2000);
          break;
        case _about:
          response = await updateAboutProfile(token, userInfo);
          setLoading(false);
          dispatch({
            type: "UPDATE_USERDATA",
            payload: userInfo,
          });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 2000);
          break;
        case _education:
          response = await updateEducationProfile(
            token,
            idSelaected,
            educationInfo
          );
          setLoading(false);
          dispatch({
            type: "UPDATE_USERDATA",
            payload: {
              ...userData,
              education: [
                userData.education.map((item) =>
                  item.id === idSelaected ? educationInfo : item
                ),
              ],
            },
          });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 2000);
          break;

        default:
          setNotification({ type: "error", message: "Unauthorized" });
      }
    } catch (error) {
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({ type: "error", message: "try later again" });
    }
  };
  console.log("object", userInfo);
  return (
    <div className="z-20 abso)lute fixed w-full inset-0 p-2 flex bg-black/50 text-gray-700 justify-center lg:backdrop-blur-xs">
      <div
        className={`bg-[#ffffff] z-20 border w-full sm:w-[65%] lg:w-[50%] ${
          toUpdate === _intro
            ? "h-[520px] sm:h-[540px] lg:h-[555px]"
            : "h-[400px] sm:h-[420px] lg:h-[435px]"
        } my-auto lg:mt-[30px] px-8 rounded-lg shadow-sm overflow-auto`}
      >
        <div className="text-center sticky top-0 pt-6 pb-2 bg-[#ffffff]">
          <h1 className="text-2xl font-semibold text-gray-800">{`Edit ${toUpdate}`}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {`Fill this inputs to Edit ${toUpdate}`}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {toUpdate !== _about ? (
            <div className="flex flex-col px-4">
              <div className="flex flex-col">
                <Label
                  text={
                    toUpdate === _intro
                      ? "FullName*"
                      : toUpdate == _education && "School*"
                  }
                  className="text-sm font-normal text-gray-600 mb-1"
                />
                <Input
                  type="text"
                  name={
                    toUpdate === _intro
                      ? "name"
                      : toUpdate === _education && "institution"
                  }
                  value={
                    toUpdate === _intro
                      ? userInfo.name
                      : toUpdate == _education && educationInfo.institution
                  }
                  onChange={handleChange}
                  className="p-2 font-normal text-sm outline-2 rounded-xs "
                />
              </div>
              <div className="flex flex-col mt-5">
                <Label
                  text={toUpdate === _intro ? "Headline*" : "Degree*"}
                  className="text-sm font-normal text-gray-600 mb-1"
                />
                <Input
                  type="text"
                  name={
                    toUpdate === _intro
                      ? "headLine"
                      : toUpdate === _education && "degree"
                  }
                  value={
                    toUpdate === _intro
                      ? userInfo.headLine
                      : toUpdate === _education && educationInfo.degree
                  }
                  onChange={handleChange}
                  className="p-2 font-normal text-sm outline-2 rounded-xs "
                />
              </div>
              {toUpdate === _intro && (
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
                    required={false}
                  />
                </div>
              )}

              {userData.role === "recuiter" && toUpdate === _intro && (
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
                  text={
                    toUpdate === _intro
                      ? "Adresse*"
                      : toUpdate === _education && "Year*"
                  }
                  className="text-sm font-normal text-gray-600 mb-1"
                />
                <Input
                  type="text"
                  name={
                    toUpdate === _intro
                      ? "location"
                      : toUpdate === _education && "year"
                  }
                  value={
                    toUpdate === _intro ? userInfo.location : educationInfo.year
                  }
                  onChange={handleChange}
                  className="p-2 font-normal text-sm outline-2 rounded-xs "
                />
              </div>
              {toUpdate === _intro && (
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
                    required={false}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col mt-5">
              <Label
                text="About"
                className="text-sm font-normal text-gray-600 mb-1"
              />

              <Textarea
                name="about"
                rows="8"
                placeholder={!userInfo.about && "About"}
                value={userInfo.about}
                onChange={handleChange}
                className="p-3 font-normal text-sm outline-2 rounded-xs "
              />
            </div>
          )}

          <div className="flex justify-end gap-4 mt-7">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpen(false)}
              className="bg-gray-200 text-gray-900 w-15 !rounded-2xl"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Save"
              loading={loading}
              className="bg-[#004182] text-[#ffffff] w-15 !rounded-2xl"
            />
          </div>
        </form>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
      </div>
    </div>
  );
};

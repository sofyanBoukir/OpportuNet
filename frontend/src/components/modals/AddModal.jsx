import { Input } from "../UI/Input";
import { Notification } from "../UI/Notification";
import { Textarea } from "../UI/Textarea";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";
import { AppSelector } from "../../selectors/AppSelector";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ERROR_MESSAGES } from "../../constants/Errors";
import {
  addEducationProfile,
  addExperienceProfile,
  addSkillProfile,
} from "../../services/profile";
import { getUserData } from "../../services/auth";

export const AddModal = ({ toAdd, setOpen }) => {
  const { userData } = AppSelector();
  const [userInfo, setUserInfo] = useState({});
  const [dataInfo, setDataInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDataInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const token = localStorage.getItem("token");

  const _about = "about";
  const _education = "education";
  const _experience = "experience";
  const _skill = "skill";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    try {
      let response;

      switch (toAdd) {
        case _education:
          const startEducation = new Date(dataInfo.start);
          const endEducation = new Date(dataInfo.end);
          const _dataEducation = {
            institution: dataInfo.institution,
            degree: dataInfo.degree,
            year: `${
              startEducation.getMonth() + 1
            }-${startEducation.getFullYear()} / ${
              endEducation.getMonth() + 1
            }-${endEducation.getFullYear()}`,
          };
          response = await addEducationProfile(token, _dataEducation);
          const eudRes = await getUserData(token);
          setLoading(false);
          dispatch({
            type: "UPDATE_USERDATA",
            payload: {
              ...userData,
              education: eudRes.data.userData.education,
            },
          });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 1000);
          break;
        case _experience:
          const startExperience = new Date(dataInfo.start);
          const endExperience = new Date(dataInfo.end);
          const _dataExperience = {
            position: dataInfo.position,
            company: dataInfo.company,
            location: dataInfo.location,
            current: dataInfo.current,
            year: `${
              startExperience.getMonth() + 1
            }-${startExperience.getFullYear()} / ${
              dataInfo.current
                ? "Current"
                : `${
                    endExperience.getMonth() + 1
                  }-${endExperience.getFullYear()}`
            }`,
            description: dataInfo.description,
          };

          response = await addExperienceProfile(token, _dataExperience);
          const expRes = await getUserData(token);
          setLoading(false);
          dispatch({
            type: "UPDATE_USERDATA",
            payload: {
              ...userData,
              experience: expRes.data.userData.experience,
            },
          });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 1000);
          break;
        case _skill:
          response = await addSkillProfile(token, dataInfo);
          setLoading(false);
          dispatch({
            type: "UPDATE_USERDATA",
            payload: {
              ...userData,
              skills: [...userData.skills, dataInfo.skill],
            },
          });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 1000);
          break;
        default:
          setNotification({
            type: "error",
            message: ERROR_MESSAGES.UNAUTHORIZED,
          });
      }
    } catch (error) {
      setLoading(false);
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({ type: "error", message: ERROR_MESSAGES.TRY_AGAIN });
    }
  };

  return (
    <div className="z-20 abso)lute fixed w-full inset-0 p-2 flex bg-black/50 text-gray-700 justify-center lg:backdrop-blur-xs">
      <div
        className={`bg-[#ffffff] z-20 border w-full sm:w-[65%] lg:w-[50%] ${
          toAdd === _experience
            ? "p-0 lg:px-[32px] sm:pb-1 h-[635px] lg:h-auto"
            : " my-auto lg:p-4 pb-4 "
        } my-auto) lg:mt-[30)px] px-)8 rounded-lg shadow-sm overflow-auto`}
      >
        <div className="text-center sticky top-0 pt-2 pb-1 mb-1 bg-[#ffffff]">
          <h1 className="text-2xl font-semibold text-gray-800">{`Add ${toAdd}`}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {`Fill this inputs to Add ${toAdd}`}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col px-4">
            {toAdd !== _about && (
              <div className="flex flex-col">
                <Label
                  text={
                    toAdd === _education
                      ? "School*"
                      : toAdd === _experience
                      ? "Position*"
                      : toAdd === _skill && "Skill*"
                  }
                  className="text-sm font-normal text-gray-600 mb-1"
                />
                <Input
                  type="text"
                  name={
                    toAdd === _education
                      ? "institution"
                      : toAdd === _experience
                      ? "position"
                      : toAdd === _skill && "skill"
                  }
                  value={
                    toAdd === _education
                      ? dataInfo.institution
                      : toAdd === _experience
                      ? dataInfo.position
                      : toAdd === _skill && dataInfo.skill
                  }
                  onChange={handleChange}
                  className="p-2 font-normal text-sm outline-2 rounded-xs "
                />
              </div>
            )}

            {toAdd === _experience && (
              <div className="flex flex-col mt-5">
                <Label
                  text="Company*"
                  className="text-sm font-normal text-gray-600 mb-1"
                />
                <Input
                  type="text"
                  name="company"
                  value={dataInfo.company}
                  onChange={handleChange}
                  className="p-2 font-normal text-sm outline-2 rounded-xs "
                />
              </div>
            )}
            {(toAdd === _education || toAdd === _experience) && (
              <>
                <div className="flex flex-col mt-5">
                  <Label
                    text={
                      toAdd === _education
                        ? "Degree*"
                        : toAdd === _experience && "Location"
                    }
                    className="text-sm font-normal text-gray-600 mb-1"
                  />
                  <Input
                    type="text"
                    name={
                      toAdd === _education
                        ? "degree"
                        : toAdd === _experience && "location"
                    }
                    value={
                      toAdd === _education
                        ? dataInfo.degree
                        : toAdd === _experience && dataInfo.location
                    }
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs "
                  />
                </div>
                {toAdd === _experience && (
                  <div className="flex items-center mt-5 mb-0">
                    <Label
                      text="Current"
                      className="text-sm font-normal text-gray-600 mb-1 mr-2"
                    />
                    <input
                      type="checkbox"
                      name="current"
                      checked={dataInfo.current}
                      onChange={handleChange}
                      className="p-2 font-normal text-sm rounded-xs "
                    />
                  </div>
                )}
                <div className="flex justify-between mt-5">
                  <div className="flex flex-col  w-[47%]">
                    <Label
                      text="Start*"
                      className="text-sm font-normal text-gray-600 mb-1"
                    />
                    <Input
                      type="date"
                      name="start"
                      value={dataInfo.start}
                      onChange={handleChange}
                      className="p-2  font-normal text-sm outline-2 rounded-xs "
                    />
                  </div>
                  <div className="flex flex-col w-[47%]">
                    <Label
                      text="End"
                      className="text-sm font-normal text-gray-600 mb-1"
                    />
                    <Input
                      type={dataInfo.current ? "text" : "date"}
                      name="end"
                      value={dataInfo.current ? "Current" : dataInfo.end}
                      onChange={handleChange}
                      className="p-2 font-normal text-sm outline-2 rounded-xs "
                      disabled={dataInfo.current}
                    />
                  </div>
                </div>
              </>
            )}

            {(toAdd === _experience || toAdd === _about) && (
              <div className="flex flex-col mt-5">
                <Label
                  text={
                    toAdd === _experience
                      ? "Description"
                      : toAdd === _about && "About"
                  }
                  className="text-sm font-normal text-gray-600 mb-1"
                />

                <Textarea
                  name={
                    toAdd === _experience
                      ? "description"
                      : toAdd === _about && "about"
                  }
                  rows="8"
                  placeholder={
                    toAdd === _experience
                      ? "description"
                      : toAdd === _about && "about"
                  }
                  value={
                    toAdd === _experience
                      ? dataInfo.description
                      : toAdd === _about && dataInfo.about
                  }
                  onChange={handleChange}
                  className="p-3 font-normal text-sm outline-2 rounded-xs "
                />
              </div>
            )}
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

import { useEffect, useState } from "react";
import { AppSelector } from "../../selectors/AppSelector";
import { Input } from "../UI/Input";
import { Notification } from "../UI/Notification";
import { Textarea } from "../UI/Textarea";
import { Label } from "../UI/Label";
import { Button } from "../UI/Button";
import {
  updateAboutProfile,
  updateEducationProfile,
  updateExperienceProfile,
  updateInterestProfil,
  updateIntroProfile,
} from "../../services/profile";
import { useDispatch } from "react-redux";
import { ERROR_MESSAGES } from "../../constants/Errors";
import { getInterests } from "../../services/interest";
import { getUserData } from "../../services/auth";

export const UpdateModal = ({ idSelected, toUpdate, setOpen }) => {
  const { userData } = AppSelector();
  const [userInfo, setUserInfo] = useState({ ...userData });
  const [educationInfo, setEducationInfo] = useState({
    ...userData.education.filter((item) => item._id === idSelected)[0],
  });
  const [experienceInfo, setExperienceInfo] = useState({
    ...userData.experience.filter((item) => item._id === idSelected)[0],
  });
  const [interests, setInterests] = useState([]);
  const [formData, setFormData] = useState({
    interests: userInfo.interests.map((item) => item._id),
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const _intro = "intro";
  const _about = "about";
  const _education = "education";
  const _experience = "experience";
  const _intserest = "intserest";

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (toUpdate === _intro || toUpdate === _about) {
      setUserInfo((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    } else if (toUpdate === _education) {
      setEducationInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setExperienceInfo((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);
    try {
      let response;
      switch (toUpdate) {
        case _intro:
          response = await updateIntroProfile(token, userInfo);
          const data = await getUserData(token);
          setLoading(false);
          dispatch({ type: "UPDATE_USERDATA", payload: data.data.userData });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 1000);
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
          }, 1000);
          break;
        case _education:
          const startEducation = new Date(educationInfo.start);
          const endEducation = new Date(educationInfo.end);
          const _dataEducation = {
            institution: educationInfo.institution,
            degree: educationInfo.degree,
            year: `${
              startEducation.getMonth() + 1
            }-${startEducation.getFullYear()} / ${
              endEducation.getMonth() + 1
            }-${endEducation.getFullYear()}`,
          };
          response = await updateEducationProfile(
            token,
            idSelected,
            _dataEducation
          );
          const edu = await getUserData(token);
          setLoading(false);
          dispatch({
            type: "UPDATE_USERDATA",
            payload: {
              ...userData,
              education: edu.data.userData.education,
            },
          });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 2000);
          break;
        case _experience:
          const startExperience = new Date(experienceInfo.start);
          const endExperience = new Date(experienceInfo.end);
          const _dataExperience = {
            position: experienceInfo.position,
            company: experienceInfo.company,
            location: experienceInfo.location,
            current: experienceInfo.current,
            year: `${
              startExperience.getMonth() + 1
            }-${startExperience.getFullYear()} / ${
              experienceInfo.current
                ? "Current"
                : `${
                    endExperience.getMonth() + 1
                  }-${endExperience.getFullYear()}`
            }`,
            description: experienceInfo.description,
          };
          response = await updateExperienceProfile(
            token,
            idSelected,
            _dataExperience
          );
          const exper = await getUserData(token);
          setLoading(false);
          dispatch({
            type: "UPDATE_USERDATA",
            payload: {
              ...userData,
              experience: exper.data.userData.experience,
            },
          });
          setNotification({ type: "success", message: response.data.message });
          setTimeout(() => {
            setOpen(false);
          }, 2000);
          break;
        case _intserest:
          if (formData.interests.length >= 5) {
            response = await updateInterestProfil(token, formData);
            const _newIneterest = await getUserData(token);
            setLoading(false);
            dispatch({
              type: "UPDATE_USERDATA",
              payload: {
                ...userData,
                interests: _newIneterest.data.userData.interests,
              },
            });
            setNotification({
              type: "success",
              message: response.data.message,
            });
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          } else {
            setLoading(false);
            setNotification({
              type: "error",
              message: "Choose more than 5",
            });
          }

          console.log("after user interest");
          break;

        default:
          setNotification({
            type: "error",
            message: ERROR_MESSAGES.UNAUTHORIZED,
          });
      }
    } catch (error) {
      setLoading(false);
      console.log("catch", error.response);
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data,
          })
        : setNotification({ type: "error", message: "try later again" });
    }
  };

  useEffect(() => {
    const _getInterests = async () => {
      setError(null);
      try {
        const response = await getInterests();

        response.status === 200 && setInterests(response.data.interests);
      } catch (err) {
        switch (err.response.status) {
          case 401:
            setError({
              type: "fromServer",
              message: err.response.data.message,
            });
            break;
          case 500:
            setError({
              type: "fromServer",
              message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            });
            break;
        }
      }
    };

    toUpdate === _intserest && _getInterests();
  }, []);

  return (
    <div className="z-20 abso)lute fixed w-full inset-0 pb-2 flex bg-black/50 text-gray-700 justify-center lg:backdrop-blur-xs">
      <div
        className={`bg-[#ffffff] z-20 border w-full sm:w-[65%] dark:bg-black ${
          toUpdate !== _intserest ? "lg:w-[50%]" : "lg:w-[65%]"
        } ${
          toUpdate === _intro ||
          toUpdate === _experience ||
          toUpdate === _intserest
            ? `${
                toUpdate !== _experience
                  ? `p-4 ${
                      toUpdate === _intserest &&
                      "!p-0 !px-2 !lg:px-4 !pb-4 h-[635px] lg:h-auto"
                    }`
                  : "p-0 lg:px-[5px] sm:pb-1 h-[635px] lg:h-auto"
              }`
            : "pb-3"
        } my-auto lg:mt-[30)px] px-8 rounded-lg shadow-sm overflow-auto `}
      >
        <div className="text-center sticky top-0 pt-4 pb-2 mb-1 bg-[#ffffff] dark:bg-black">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{`Edit ${toUpdate}`}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {`Fill this inputs to Edit ${toUpdate}`}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {toUpdate !== _about ? (
            <div className="flex flex-col px-4">
              {toUpdate !== _intserest && (
                <div className="flex flex-col">
                  <Label
                    text={
                      toUpdate === _intro
                        ? "FullName*"
                        : toUpdate === _education
                        ? "School*"
                        : toUpdate === _experience && "Position*"
                    }
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />
                  <Input
                    type="text"
                    name={
                      toUpdate === _intro
                        ? "name"
                        : toUpdate === _education
                        ? "institution"
                        : toUpdate === _experience && "position"
                    }
                    value={
                      toUpdate === _intro
                        ? userInfo.name
                        : toUpdate === _education
                        ? educationInfo.institution
                        : toUpdate === _experience && experienceInfo.position
                    }
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                  />
                </div>
              )}
              {toUpdate === _experience && (
                <div className="flex flex-col mt-5">
                  <Label
                    text="Company*"
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />
                  <Input
                    type="text"
                    name="company"
                    value={experienceInfo.company}
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                  />
                </div>
              )}
              {toUpdate !== _intserest && (
                <div className="flex flex-col mt-5">
                  <Label
                    text={
                      toUpdate === _intro
                        ? "Headline*"
                        : toUpdate === _education
                        ? "Degree*"
                        : toUpdate === _experience && "Location"
                    }
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />
                  <Input
                    type="text"
                    name={
                      toUpdate === _intro
                        ? "headLine"
                        : toUpdate === _education
                        ? "degree"
                        : toUpdate === _experience && "location"
                    }
                    value={
                      toUpdate === _intro
                        ? userInfo.headLine
                        : toUpdate === _education
                        ? educationInfo.degree
                        : toUpdate === _experience && experienceInfo.location
                    }
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                  />
                </div>
              )}
              {toUpdate === _intro && (
                <div className="flex flex-col mt-5">
                  <Label
                    text="Photo Profil"
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />
                  <Input
                    type="file"
                    name="profile_picture"
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                    required={false}
                  />
                </div>
              )}

              {userData.role === "recuiter" && toUpdate === _intro && (
                <div className="flex flex-col mt-5">
                  <Label
                    text="Company"
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />
                  <Input
                    type="text"
                    name="companyName"
                    value={userInfo.companyName}
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                  />
                </div>
              )}
              {toUpdate === _intro && (
                <div className="flex flex-col mt-5">
                  <Label
                    text="Adresse*"
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />
                  <Input
                    type="text"
                    name="location"
                    value={userInfo.location}
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                  />
                </div>
              )}

              {(toUpdate === _education || toUpdate === _experience) && (
                <>
                  {toUpdate === _experience && (
                    <div className="flex items-center mt-5">
                      <Label
                        text="Current"
                        className="text-sm font-normal text-gray-600 mb-1 mr-2 dark:text-white"
                      />
                      <input
                        type="checkbox"
                        name="current"
                        checked={experienceInfo.current}
                        onChange={handleChange}
                        className="p-2 font-normal text-sm rounded-xs"
                        // required={false}
                      />
                    </div>
                  )}
                  <div className="flex justify-between">
                    <div className="flex flex-col mt-5 w-[47%]">
                      <Label
                        text="Start*"
                        className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                      />
                      <Input
                        type="date"
                        name="start"
                        value={experienceInfo.start}
                        onChange={handleChange}
                        className="p-2  font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                      />
                    </div>
                    <div className="flex flex-col mt-5 w-[47%]">
                      <Label
                        text="End"
                        className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                      />
                      <Input
                        type={experienceInfo.current ? "text" : "date"}
                        name="end"
                        value={
                          experienceInfo.current
                            ? "Current"
                            : experienceInfo.end
                        }
                        onChange={handleChange}
                        className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                        disabled={experienceInfo.current}
                      />
                    </div>
                  </div>
                </>
              )}
              {toUpdate === _intro && (
                <div className="flex flex-col mt-5">
                  <Label
                    text="Link"
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />
                  <Input
                    type="text"
                    name="webSite"
                    value={userInfo.webSite}
                    onChange={handleChange}
                    className="p-2 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                    required={false}
                  />
                </div>
              )}
              {toUpdate === _experience && (
                <div className="flex flex-col mt-5">
                  <Label
                    text="Description"
                    className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
                  />

                  <Textarea
                    name="description"
                    rows="8"
                    placeholder="description"
                    value={experienceInfo.description}
                    onChange={handleChange}
                    className="p-3 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
                  />
                </div>
              )}
              {toUpdate === _intserest && (
                <div>
                  <h1 className="text-3xl font-semibold text-center dark:text-white">
                    Select your interests!{" "}
                  </h1>
                  <br></br>
                  <span className="text-gray-800 text-lg dark:text-white">
                    Choose topics that matter to you the most. Your feed will be
                    customized based on your selections. <br></br>
                    <span className="underline">At least 5 interests</span>
                  </span>

                  <div className="flex mt-4 flex-wrap justify-center gap-2">
                    {interests && interests.length
                      ? interests.map((interest) => {
                          return (
                            <div
                              onClick={() =>
                                formData.interests.includes(interest._id)
                                  ? setFormData({
                                      interests: formData.interests.filter(
                                        (item) => item !== interest._id
                                      ),
                                    })
                                  : setFormData({
                                      interests: [
                                        ...formData.interests,
                                        interest._id,
                                      ],
                                    })
                              }
                              className={`px-4 py-2 shadow rounded-sm border cursor-pointer hover:bg-gray-100 duration-200
                              ${
                                formData.interests.includes(interest._id)
                                  ? "bg-blue-50 border-blue-700 text-blue-800"
                                  : null
                              }`}
                            >
                              {interest.interest}
                            </div>
                          );
                        })
                      : error && <span className="text-red-500">{error}</span>}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col mt-5">
              <Label
                text="About"
                className="text-sm font-normal text-gray-600 mb-1 dark:text-white"
              />

              <Textarea
                name="about"
                rows="8"
                placeholder={!userInfo.about && "About"}
                value={userInfo.about}
                onChange={handleChange}
                className="p-3 font-normal text-sm outline-2 rounded-xs dark:border dark:border-gray-600 dark:text-gray-300 w-full"
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

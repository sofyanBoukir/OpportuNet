import axios from "axios";
const authService = import.meta.env.VITE_USER_SERVICE;

export const completeRegistration = async (token, formData) => {
  const response = await axios.put(
    `${authService}/profile/completeRegistration`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateIntroProfile = async (token, formData) => {
  const response = await axios.put(
    `${authService}/profile/updateInfo`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const updateAboutProfile = async (token, contentAbout) => {
  const response = await axios.put(
    `${authService}/profile/updateAbout`,
    contentAbout,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateEducationProfile = async (token, educationId, formData) => {
  const response = await axios.put(
    `${authService}/profile/updateEducation/${educationId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteEducation = async (token, educationId) => {
  const response = await axios.delete(
    `${authService}/profile/deleteEducation/${educationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteExperience = async (token, experienceId) => {
  const response = await axios.delete(
    `${authService}/profile/deleteExperience/${experienceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteSkill = async (token, skillId) => {
  const response = await axios.delete(
    `${authService}/profile/deleteSkill/${skillId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const completeRegistration = async (token, formData) => {
  const response = await axios.put(
    `${serverURL}/profile/completeRegistration`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const searchUsers = async (token, query) => {
  const response = await axios.get(
    `${serverURL}/profile/searchUsers/${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const searchHashTags = async (token, query) => {
  const response = await axios.get(
    `${serverURL}/profile/searchHashTags/${query}`,
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
    `${serverURL}/profile/updateInfo`,
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
    `${serverURL}/profile/updateAbout`,
    contentAbout,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const addEducationProfile = async (token, formData) => {
  const response = await axios.post(
    `${serverURL}/profile/addEducation`,
    formData,
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
    `${serverURL}/profile/updateEducation/${educationId}`,
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
    `${serverURL}/profile/deleteEducation/${educationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const addExperienceProfile = async (token, formData) => {
  const response = await axios.post(
    `${serverURL}/profile/addExperience`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateExperienceProfile = async (
  token,
  experienceId,
  formData
) => {
  const response = await axios.put(
    `${serverURL}/profile/updateExperience/${experienceId}`,
    formData,
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
    `${serverURL}/profile/deleteExperience/${experienceId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const addSkillProfile = async (token, formData) => {
  const response = await axios.post(`${serverURL}/profile/addSkill`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteSkill = async (token, skillId) => {
  const response = await axios.delete(
    `${serverURL}/profile/deleteSkill/${skillId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getUserById = async (token) => {
  const response = await axios.get(
    `${serverURL}/profile/getUserDataById/67d91e63967866664dd4322c`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

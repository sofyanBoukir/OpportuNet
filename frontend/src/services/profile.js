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

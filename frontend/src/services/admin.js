import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const getUsers = async (token) => {
  const response = await axios.get(`${serverURL}/auth/getUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

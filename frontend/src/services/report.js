import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const addReport = async (token, postId) => {
  const response = await axios.post(
    `${serverURL}/report/addReport/${postId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

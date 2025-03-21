import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const getSavedPost = async (token,page) => {
    const response = await axios.get(`${serverURL}/saved/getSavedPosts?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };
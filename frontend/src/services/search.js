import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const getserachUsers = async (token, query) => {
  const response = await axios.get(
    `${serverURL}/search/searchUsers?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getserachPosts = async (token, query, page) => {
  const response = await axios.get(
    `${serverURL}/search/searchPosts?query=${query}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

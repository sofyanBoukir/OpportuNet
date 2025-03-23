import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const serachUsersPosts = async (token, query) => {
  const response = await axios.get(`${serverURL}/search/searchUsersPosts?query=${query}`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
};

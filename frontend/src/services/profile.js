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

export const searchUsers = async (token,query) =>{
  const response = await axios.get(`${serverURL}/profile/searchUsers/${query}`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  })
  return response;
} 


export const searchHashTags = async (token,query) =>{
  const response = await axios.get(`${serverURL}/profile/searchHashTags/${query}`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  })
  return response;
}
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

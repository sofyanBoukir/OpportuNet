import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const addPost = async (token, postData) => {
  const response = await axios.post(`${serverURL}/post/addPost`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};



export const getWhoLikedPost = async (token,postId) =>{
  const response = await axios.get(`${serverURL}/post/getWhoLikedPost/${postId}`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response
}

export const toggleLike = async (token, postId) => {
  const response = await axios.put(
    `${serverURL}/post/toggleLike/${postId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getPost = async (token, postId) => {
  const response = await axios.get(`${serverURL}/post/getPost/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deletePost = async (token, postId) => {
  const response = await axios.delete(
    `${serverURL}/post/deletePost/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const toggleSave = async (token, postId) => {
  const response = await axios.put(
    `${serverURL}/post/toggleSave/${postId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

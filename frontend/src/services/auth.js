import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const login = async (formData) => {
  const response = await axios.post(`${serverURL}/auth/signIn`, formData);
  return response;
};


export const logout = async (token) =>{
  const response = await axios.post(`${serverURL}/auth/logout`,null,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}


export const signUp = async (formData) => {
  const response = await axios.post(`${serverURL}/auth/signUp`, formData);
  return response;
};

export const signedInButNotVerified = async (email) => {
  const response = await axios.post(`${serverURL}/auth/signInNotVerified`, {
    email,
  });
  return response;
};

export const checkVcode = async (email, vcode) => {
  const response = await axios.post(`${serverURL}/auth/checkVCode`, {
    email,
    vcode,
  });
  return response;
};

export const sendResetLink = async (email) => {
  const response = await axios.post(`${serverURL}/auth/sendResetLink`, {
    email,
  });
  return response;
};

export const resetPassword = async (formData) => {
  const response = await axios.post(
    `${serverURL}/auth/resetPassword`,
    formData
  );
  return response;
};

export const isNewUser = async (token) => {
  const response = await axios.get(`${serverURL}/auth/isNewUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getUserData = async (token) => {
  const response = await axios.get(`${serverURL}/auth/getUserData`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

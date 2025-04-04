import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER_URL;

export const getUsers = async (token, page) => {
  const response = await axios.get(`${serverURL}/auth/getUsers?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteUser = async (token, id) => {
  const response = await axios.delete(`${serverURL}/auth/deleteUser/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const AddAdmin = async (token, data) => {
  const response = await axios.post(`${serverURL}/admin/addAdmin`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getAdmins = async (token, page) => {
  const response = await axios.get(
    `${serverURL}/admin/getAdmins?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getReportPosts = async (token, page) => {
  const response = await axios.get(
    `${serverURL}/report/getAllReports?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteReportPosts = async (token, postId) => {
  const response = await axios.delete(
    `${serverURL}/report/deleteReport/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

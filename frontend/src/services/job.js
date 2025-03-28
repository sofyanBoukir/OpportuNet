import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getJobs = async (token,page) =>{
    const response = await axios.get(`${serverUrl}/job/getJobs?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}

export const searchForJobs = async (token,query) =>{
    const response = await axios.get(`${serverUrl}/search/searchForJobs?query=${query}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response
}

export const applyForJob = async (token,jobId) =>{
    const response = await axios.post(`${serverUrl}/job/applyForJob/${jobId}`,null,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response
}
export const addJob = async (token, jobData) => {
  const response = await axios.post(`${serverUrl}/job/postNewJob`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export const modifyJob = async (token, jobData ,jobId) => {
  const response = await axios.put(`${serverUrl}/job/editJob/${jobId}`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export const getPostedJobs = async (token) =>{
    const response = await axios.get(`${serverUrl}/job/getPostedJobs`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}
export const getPostedJobsById = async (token , jobId) =>{
  const response = await axios.get(`${serverUrl}/job/getPostedJob/${jobId}`,{
      headers : {
          Authorization : `Bearer ${token}`
      }
  })
  return response;
}

export const deleteJob = async (token, jobId) => {
  const response = await axios.delete(
    `${serverUrl}/job/deleteJob/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
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
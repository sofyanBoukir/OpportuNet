import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const getFeed = async (token,page) =>{
    const response = await axios.get(`${serverURL}/home/getFeed?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}
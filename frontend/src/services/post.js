import axios from "axios"
const serverURL = import.meta.env.VITE_SERVER_URL;

export const addPost = async (token,postData) =>{
    const response = await axios.post(`${serverURL}/post/addPost`,postData,{
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    });
    return response
}
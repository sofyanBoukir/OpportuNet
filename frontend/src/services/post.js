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

export const isAlreadyLiked = async (token,postId) =>{
    const response = await axios.get(`${serverURL}/post/idAlreadyLiked/${postId}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}

export const toggleLike = async (token,postId) =>{
    const response = await axios.put(`${serverURL}/post/toggleLike/${postId}`,null,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}
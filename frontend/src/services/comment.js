import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

export const getPostComments = async (token,postId,page) =>{
    const response = await axios.get(`${serverURL}/comment/getPostComments/${postId}?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}


export const commentOnPost = async (token,postId,comment) =>{
    const response = await axios.post(`${serverURL}/comment/commentOnPost/${postId}`,{comment},{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
} 


export const deleteComment = async (token,postId,commentId) =>{
    const response = await axios.delete(`${serverURL}/comment/deleteComment/${postId}/${commentId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}
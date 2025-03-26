import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;


export const getConversations = async (token,page) =>{
    const response = await axios.get(`${serverUrl}/conversation/getConversations?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response
}

export const getMessagesByConversation = async (token,conversationId) =>{
    const response = await axios.get(`${serverUrl}/conversation/getMessagesByConversation/${conversationId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response
} 
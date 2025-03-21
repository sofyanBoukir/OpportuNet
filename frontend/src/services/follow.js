import axios from "axios"
const serverURL = import.meta.env.VITE_SERVER_URL;

export const toggleFollow = async (token,followingId) =>{
    const response = await axios.put(`${serverURL}/follow/toggleFollow`,{followingId},{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response
}


export const getFollowers = async (token) =>{
    const response = await axios.get(`${serverURL}/follow/getFollowers`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}


export const getFollowing = async (token) =>{
    const response = await axios.get(`${serverURL}/follow/getFollowing`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}
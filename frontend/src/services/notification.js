import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;


export const getUserNotifications = async (token,page) =>{
    const response = await axios.get(`${serverURL}/notification/getUserNotifications?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}

export const deleteNotification = async (token,notificationId) =>{
    const response = await axios.delete(`${serverURL}/notification/deleteNotification/${notificationId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const makeNotificationsSeen = async (token) =>{
    const response = await axios.put(`${serverURL}/notification/makeNotificationsSeen`,null,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}
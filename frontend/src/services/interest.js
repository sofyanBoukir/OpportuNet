import axios from "axios"
const authService = import.meta.env.VITE_USER_SERVICE;

export const getInterests = async () =>{
    const response = await axios.get(`${authService}/interest/interests`);
    return response;
}
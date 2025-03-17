import axios from "axios"
const serverURL = import.meta.env.VITE_SERVER_URL;

export const getInterests = async () =>{
    const response = await axios.get(`${serverURL}/interest/interests`);
    return response;
}
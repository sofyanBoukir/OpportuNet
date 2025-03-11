import axios from "axios"
const authService = import.meta.env.VITE_USER_SERVICE;

export const login = async (formData) =>{
    const response = await axios.post(`${authService}/auth/signIn`,formData);
    return response;
}

export const signUp = async (formData) =>{
    const response = await axios.post(`${authService}/auth/signUp`,formData);
    return response;
}

export const signedInButNotVerified = async (email) =>{
    const response = await axios.post(`${authService}/auth/signInNotVerified`,{email});
    return response;
}
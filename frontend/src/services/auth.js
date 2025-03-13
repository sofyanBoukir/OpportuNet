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

export const checkVcode = async (email,vcode) =>{
    const response = await axios.post(`${authService}/auth/checkVCode`,{email,vcode});
    return response;
}

export const sendResetLink = async (email) =>{
    const response = await axios.post(`${authService}/auth/sendResetLink`,{email});
    return response;
}

export const resetPassword = async (formData) =>{
    const response = await axios.post(`${authService}/auth/resetPassword`,formData);
    return response;
}

export const isNewUser = async (token) =>{
    const response = await axios.get(`${authService}/auth/isNewUser`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const getUserData = async (token) =>{
    const response = await axios.get(`${authService}/auth/getUserData`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}
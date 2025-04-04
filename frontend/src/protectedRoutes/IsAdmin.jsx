
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserData } from "../services/auth";

export const IsAdmin = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading,setLoading] = useState(true);

    const _getUserData = async () => {
        try {
        const response = await getUserData(localStorage.getItem("token"));        
        setLoading(false)
        console.log(response);
        
        if (response.data.userData.role === 'admin') {
            console.log('redirecde');
            
            setIsAdmin(true);
            console.log('its admin');
            
        }
        } catch (err) {
            setLoading(false)
            navigate("/user/sign_in");
        }
    };

    useEffect(() => {
        _getUserData();
    }, []);

    if (loading) return null;
    return isAdmin === true ? <Outlet /> : <Navigate to={'/user/sign_in'} />
}



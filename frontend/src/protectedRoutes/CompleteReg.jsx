import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isNewUser } from "../services/auth";
import { useDispatch } from "react-redux";

export const IsNewUser = () => {
    const [newUser,setNewUser] = useState(false);
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const CHECK_isNewUser = async () =>{
        try{
            const response = await isNewUser(localStorage.getItem('token'));
            
            if(response.status === 200){
                response.data.newUser && setNewUser(true);
                dispatch({type:"UPDATE_USERDATA",payload:response.data.userData})
            }
        }
        catch(err){
            navigate(-1)
        }
    }

    useEffect(() =>{
        CHECK_isNewUser()
    },[])

  return newUser ? <Outlet /> : navigate(-1);
};

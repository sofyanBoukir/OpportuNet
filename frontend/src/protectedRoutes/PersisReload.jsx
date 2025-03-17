import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserData } from "../services/auth";

export const PersisReload = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validToken,setValidToken] = useState(false);

    const _getUserData = async () =>{
        try{
            const response = await getUserData(localStorage.getItem('token'));
            if(response.data.userData){
              response.data.userData.isNewUser && navigate('/user/completeRegistration');
              dispatch({type:"UPDATE_USERDATA",payload:response.data.userData});
              setValidToken(true);
            }
        }catch(err){
            navigate('/user/sign_in')
        }
    }

  useEffect(() => {
    _getUserData()
  },[]);

  return validToken ? <Outlet /> : navigate('/user/sign_in');
};

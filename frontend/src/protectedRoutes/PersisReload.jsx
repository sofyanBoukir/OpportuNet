import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserData } from "../services/auth";

export const PersisReload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(false);
  const [loading,setLoading] = useState(true)

  const _getUserData = async () => {
    try {
      const response = await getUserData(localStorage.getItem("token"));
      setLoading(false)
      if (response.data.userData) {
        if(response.data.userData.role === 'admin'){
          navigate('/admin/users')
          return;
        }
        response.data.userData.isNewUser &&
          navigate("/user/completeRegistration");
          dispatch({ type: "UPDATE_USERDATA", payload: response.data.userData });
          setValidToken(true);
      }
    } catch (err) {
      setLoading(false)
      navigate("/user/sign_in");
    }
  };

  useEffect(() => {
    _getUserData();
  }, []);

  if(loading) return null
  return validToken ? <Outlet /> : <Navigate to={"/user/sign_in"} />;
};


export const isUserAuth = async () =>{
    try {
      const response = await getUserData(localStorage.getItem("token"));      
      if (response.data.userData) {
        return true;
      }else{
        return false;
      }
    } catch (err) {
      return false
    }
}
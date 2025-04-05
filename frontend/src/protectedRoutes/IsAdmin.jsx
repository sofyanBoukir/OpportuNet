import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserData } from "../services/auth";
import { useDispatch } from "react-redux";

export const IsAdmin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const _getUserData = async () => {
    try {
      const response = await getUserData(localStorage.getItem("token"));
      setLoading(false);
      if (response.data.userData.role === "admin") {
        setIsAdmin(true);
        dispatch({
          type: "UPDATE_USERDATA",
          payload: response.data.userData,
        });
      }
    } catch (err) {
      setLoading(false);
      navigate("/user/sign_in");
    }
  };

  useEffect(() => {
    _getUserData();
  }, []);

  if (loading) return null;
  return isAdmin === true ? <Outlet /> : <Navigate to={"/user/sign_in"} />;
};

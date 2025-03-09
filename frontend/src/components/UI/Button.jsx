import { CircularProgress } from "@mui/material";
import React from "react";
export const Button = ({ type, loading, onClick, text, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white bg-blue-700 px-3 cursor-pointer ${
        loading ? "cursor-no-drop" : null
      } font-semibold py-1 rounded-md h-9 flex items-center justify-center text-md ${className}`}
      disabled={loading}
    >
      {loading ? <CircularProgress size={"22px"} color="white" /> : text}
    </button>
  );
};
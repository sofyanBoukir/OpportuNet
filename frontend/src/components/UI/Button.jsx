import { CircularProgress } from "@mui/material";
import React from "react";
export const Button = ({ type,disabled, loading, onClick, text, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 cursor-pointer ${
        loading ? "cursor-no-drop" : null
      } font-semibold rounded-md h-9 flex items-center duration-200 justify-center text-md ${className}`}
      disabled={loading ? loading : disabled}
    >
      {loading ? <CircularProgress size={"22px"} color="white" /> : text}
    </button>
  );
};
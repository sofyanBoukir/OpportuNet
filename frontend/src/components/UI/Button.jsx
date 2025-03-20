import { CircularProgress } from "@mui/material";
import React from "react";
import ExtraLoader from "./ExtraLoader";
export const Button = ({
  type,
  disabled,
  loading,
  onClick,
  text,
  className,
  rounded
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer ${
        loading ? "cursor-no-drop" : null
      } font-semibold ${rounded ? rounded : 'rounded-md'} relative px-3 h-9 flex items-center duration-200 justify-center text-md ${className}`}
      disabled={loading ? loading : disabled}
    >
      {loading ? <ExtraLoader /> : text}
    </button>
  );
};

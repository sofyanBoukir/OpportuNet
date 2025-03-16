import React from 'react'

export const Follow = ({ type,disabled, loading, onClick, text, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 cursor-pointer ${
        loading ? "cursor-no-drop" : null
      } font-semibold flex items-center duration-200 justify-center text-md ${className}`}
      disabled={loading ? loading : disabled}
    >
      {loading ? "...Loading" : text}
    </button>
  );
};
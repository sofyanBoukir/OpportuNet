import React from "react"


export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = true,
  maxLength,
  className,
  onClick
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onClick={onClick}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      className={`text-black text-md ${className}`}
    />
  );
};

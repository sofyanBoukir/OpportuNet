import React from "react";

export const Input = ({
  disabled,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = true,
  maxLength,
  className,
  onClick,
}) => {
  return (
    <input
      disabled={disabled}
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

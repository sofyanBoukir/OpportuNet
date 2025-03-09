import React from 'react'

export const Textarea = ({ name, value, placeholder, onChange, className}) => {
  return (
    <textarea name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`resize-none ${className}`} />
)
}

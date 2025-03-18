import React from 'react'

export const Textarea = ({ name, value, placeholder, onChange, className}) => {
  return (
    <textarea name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        spellCheck={false}
        className={`resize-none ${className}`} />
)
}

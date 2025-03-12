export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = true,
  maxLength,
  className,
}) => {
  return (
    <input
<<<<<<< HEAD
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className={`text-black font-semibold text-md bg-inherit ${className}`}
=======
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      className={`text-black text-md ${className}`}
>>>>>>> c315512d29e4584a9c8945993c408e84ae896997
    />
  );
};

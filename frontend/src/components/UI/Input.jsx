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
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className={`text-black text-md bg-inherit ${className}`}
    />
  );
};
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
        className={`border text-black px-3 py-1 text-md bg-inherit rounded-sm outline-none ${className}`}
    />
  );
};
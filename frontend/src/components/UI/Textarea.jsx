export const Textarea = ({
  cols,
  rows,
  name,
  value,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      onChange={onChange}
      spellCheck={false}
      className={`resize-none ${className}`}
    />
  );
};

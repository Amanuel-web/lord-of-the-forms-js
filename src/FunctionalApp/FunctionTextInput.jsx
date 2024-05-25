export const FunctionalTextInput = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="input-wrap">
      <label>{label}:</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
      />
    </div>
  );
};

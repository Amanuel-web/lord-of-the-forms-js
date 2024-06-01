import { ErrorMessage } from "../ErrorMessage";

export const FunctionalTextInput = ({
  label,
  value,
  onChange,
  placeholder,
  errorMessage,
  isValid = true,
}) => {
  return (
    <>
      <div className="input-wrap">
        <label>{label}:</label>
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type="text"
        />
      </div>
      <ErrorMessage message={errorMessage} show={isValid} />
    </>
  );
};

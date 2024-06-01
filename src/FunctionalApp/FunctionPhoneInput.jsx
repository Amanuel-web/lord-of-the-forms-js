import { ErrorMessage } from "../ErrorMessage";

export const FunctionalPhoneInput = ({
  inputs,
  handleInputChange,
  handleBackspace,
  errorMessage,
  isValid = true,
}) => {
  return (
    <>
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>

        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            maxLength="2"
            value={inputs[0]}
            onChange={(e) => handleInputChange(0, e)}
            onKeyDown={(e) => handleBackspace(0, e)}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            maxLength="2"
            value={inputs[1]}
            onChange={(e) => handleInputChange(1, e)}
            onKeyDown={(e) => handleBackspace(1, e)}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            maxLength="2"
            value={inputs[2]}
            onChange={(e) => handleInputChange(2, e)}
            onKeyDown={(e) => handleBackspace(2, e)}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            maxLength="1"
            value={inputs[3]}
            onChange={(e) => handleInputChange(3, e)}
            onKeyDown={(e) => handleBackspace(3, e)}
          />
        </div>
      </div>
      <ErrorMessage message={errorMessage} show={isValid} />
    </>
  );
};

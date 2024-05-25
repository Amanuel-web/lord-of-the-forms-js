import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { allCities } from "../utils/all-cities";
import { isEmailValid } from "../utils/validations";
import isCityValid from "../utils/isCityValid";
import { FunctionalPhoneInput } from "./FunctionPhoneInput";
import { FunctionalTextInput } from "./FunctionTextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ setUserData }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [inputs, setInputs] = useState(["", "", "", ""]);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    const value = event.target.value;

    if (value === "" || /^[0-9]+$/.test(value)) {
      newInputs[index] = value;
      setInputs(newInputs);

      if (value.length === (index === 3 ? 1 : 2)) {
        const nextInput = document.getElementById(`phone-input-${index + 2}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && inputs[index].length === 0 && index > 0) {
      const previousInput = document.getElementById(`phone-input-${index}`);
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const phone = inputs.join("");
    if (
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      isEmailValid(email) &&
      city.length > 0 &&
      phone.length === 7
    ) {
      const userData = { firstName, lastName, email, city, phone };
      setUserData(userData);
      // Clear the input fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setCity("");
      setInputs(["", "", "", ""]);
      setIsSubmitted(false);
    } else {
      alert("Bad data input");
    }
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "city":
        setCity(value);
        break;
      default:
        break;
    }
  };

  const isFirstNameValid = isSubmitted && firstName.length < 2;
  const isLastNameValid = isSubmitted && lastName.length < 2;
  const isEmailValidated = isSubmitted && !isEmailValid(email);
  const isCityValidated = isSubmitted && isCityValid(city);
  const totalPhoneInput = inputs.join("").length;
  const isPhoneNumberValid = isSubmitted && totalPhoneInput !== 7;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <FunctionalTextInput
          label="First Name"
          value={firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="Bilbo"
        />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={isFirstNameValid} />
      {/* last name input */}
      <div className="input-wrap">
        <FunctionalTextInput
          label="Last Name"
          value={lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Baggins"
        />
      </div>
      <ErrorMessage message={lastNameErrorMessage} show={isLastNameValid} />

      {/* Email Input */}
      <div className="input-wrap">
        <FunctionalTextInput
          label="Email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="bilbo-baggins@adventurehobbits.net"
        />
      </div>
      <ErrorMessage message={emailErrorMessage} show={isEmailValidated} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          placeholder="Hobbiton"
          list="cities"
          name="city"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          value={city}
        />
        <datalist id="cities">
          {allCities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </div>
      <ErrorMessage message={cityErrorMessage} show={isCityValidated} />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <FunctionalPhoneInput
            inputs={inputs}
            handleInputChange={handleInputChange}
            handleBackspace={handleBackspace}
          />
        </div>
      </div>

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={isPhoneNumberValid}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

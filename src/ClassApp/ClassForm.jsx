import { Component } from "react";
import { isEmailValid } from "../utils/validations";
import { ErrorMessage } from "../ErrorMessage";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";
import { allCities } from "../utils/all-cities";
import isCityValid from "../utils/isCityValid";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  state = {
    isSubmitted: false,
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    inputs: ["", "", "", ""],
  };

  handleInputChange = (index, event) => {
    const newInputs = [...this.state.inputs];
    const value = event.target.value;

    if (value === "" || /^[0-9]+$/.test(value)) {
      newInputs[index] = value;
      this.setState({ inputs: newInputs });

      if (value.length === event.target.maxLength) {
        const nextInput =
          document.getElementById(`phone-input${index + 2}`) ||
          document.querySelector(`.class-phone-input-${index + 2}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  handleBackspace = (index, event) => {
    if (
      event.key === "Backspace" &&
      this.state.inputs[index].length === 0 &&
      index > 0
    ) {
      const previousInput =
        document.getElementById(`phone-input${index}`) ||
        document.querySelector(`.class-phone-input-${index}`);
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  resetSetInputs = () => {
    this.setState({
      isSubmitted: false,
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      inputs: ["", "", "", ""],
    });
  };

  handleSubmit = () => {
    this.setState({ isSubmitted: true });
    const phone = this.state.inputs.join("");
    const { firstName, lastName, email, city } = this.state;
    if (
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      isEmailValid(email) &&
      isCityValid(city) &&
      phone.length === 7
    ) {
      const userData = { firstName, lastName, email, city, phone };
      this.props.setUserData(userData);

      this.resetSetInputs();
    } else {
      alert("Bad data input");
    }
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { isSubmitted, firstName, lastName, email, city, inputs } =
      this.state;

    const isFirstNameValid = isSubmitted && firstName.length < 2;
    const isLastNameValid = isSubmitted && lastName.length < 2;
    const isEmailValidated = isSubmitted && !isEmailValid(email);
    const isCityValidated = isSubmitted && !isCityValid(city);
    const totalPhoneInput = inputs.join("").length;
    const isPhoneNumberValid = isSubmitted && totalPhoneInput !== 7;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit();
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}

        <ClassTextInput
          label="First Name"
          value={firstName}
          onChange={(e) => this.handleChange("firstName", e.target.value)}
          placeholder="Bilbo"
          isValid={isFirstNameValid}
          errorMessage={firstNameErrorMessage}
        />

        {/* last name input */}

        <ClassTextInput
          label="Last Name"
          value={lastName}
          onChange={(e) => this.handleChange("lastName", e.target.value)}
          placeholder="Baggins"
          isValid={isLastNameValid}
          errorMessage={lastNameErrorMessage}
        />

        {/* Email Input */}

        <ClassTextInput
          label="Email"
          value={email}
          onChange={(e) => this.handleChange("email", e.target.value)}
          placeholder="bilbo-baggins@adventurehobbits.net"
          isValid={isEmailValidated}
          errorMessage={emailErrorMessage}
        />

        {/* City Input */}
        <div className="input-wrap">
          <label>City:</label>
          <input
            placeholder="Hobbiton"
            list="cities"
            name="city"
            id="city"
            onChange={(e) => {
              this.setState({ city: e.target.value });
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

        <ClassPhoneInput
          inputs={inputs}
          handleInputChange={this.handleInputChange}
          handleBackspace={this.handleBackspace}
          isValid={isPhoneNumberValid}
          errorMessage={phoneNumberErrorMessage}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

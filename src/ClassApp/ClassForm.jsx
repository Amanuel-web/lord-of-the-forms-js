import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassTextInput";
import { allCities } from "../utils/all-cities";
import isCityValid from "../utils/isCityValid";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
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

  // handleInputChange = (index, event) => {
  //   const newInputs = [...this.state.inputsOfClass];
  //   const value = event.target.value;

  //   if (value === "" || /^[0-9]+$/.test(value)) {
  //     newInputs[index] = value;
  //     this.setState({ inputsOfClass: newInputs });

  //     if (value.length === (index === 3 ? 1 : 2)) {
  //       const nextInput = document.getElementById(`phone-input${index + 2}`);
  //       if (nextInput) {
  //         nextInput.focus();
  //       }
  //     }
  //   }
  // };

  // handleBackspace = (index, event) => {
  //   if (
  //     event.key === "Backspace" &&
  //     this.state.inputsOfClass[index].length === 0 &&
  //     index > 0
  //   ) {
  //     const previousInput = document.getElementById(`phone-input${index}`);
  //     if (previousInput) {
  //       previousInput.focus();
  //     }
  //   }
  // };

  handleInputChange = (index, event) => {
    const newInputs = [...this.state.inputs];
    const value = event.target.value;

    if (value === "" || /^[0-9]+$/.test(value)) {
      newInputs[index] = value;
      this.setState({ inputs: newInputs });

      if (value.length === (index === 3 ? 1 : 2)) {
        const nextInput = document.getElementById(`phone-input${index + 2}`);
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
      const previousInput = document.getElementById(`phone-input${index}`);
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  handleSubmit = () => {
    this.setState({ isSubmitted: true });
    const phone = this.state.inputsOfClass.join("");
    const { firstName, lastName, email, city } = this.state;
    if (
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      isEmailValid(email) &&
      city.length > 0 &&
      phone.length === 7
    ) {
      const userData = { firstName, lastName, email, city, phone };
      this.props.setUserData(userData);

      this.setState({
        isSubmitted: false,
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        inputsOfClass: ["", "", "", ""],
      });
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
    const isCityValidated = isSubmitted && isCityValid(city);
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
        <div className="input-wrap">
          <ClassTextInput
            label="First Name"
            value={firstName}
            onChange={(e) => this.handleChange("firstName", e.target.value)}
            placeholder="Bilbo"
          />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={isFirstNameValid} />

        {/* last name input */}
        <div className="input-wrap">
          <ClassTextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => this.handleChange("lastName", e.target.value)}
            placeholder="Baggins"
          />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={isLastNameValid} />

        {/* Email Input */}
        <div className="input-wrap">
          <ClassTextInput
            label="Email"
            value={email}
            onChange={(e) => this.handleChange("email", e.target.value)}
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

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input">
            <ClassPhoneInput
              inputs={inputs}
              handleInputChange={this.handleInputChange}
              handleBackspace={this.handleBackspace}
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
  }
}

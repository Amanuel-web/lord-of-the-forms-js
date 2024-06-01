import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

export class ClassTextInput extends Component {
  render() {
    const {
      label,
      value,
      onChange,
      placeholder,
      type = "text",
      errorMessage,
      isValid = true,
    } = this.props;
    return (
      <>
        <div className="input-wrap">
          <label>{label}:</label>
          <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
          />
        </div>
        <ErrorMessage message={errorMessage} show={isValid} />
      </>
    );
  }
}

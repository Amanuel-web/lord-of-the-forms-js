import { Component } from "react";

export class ClassTextInput extends Component {
  render() {
    const { label, value, onChange, placeholder, type = "text" } = this.props;
    return (
      <div className="input-wrap">
        <label>{label}:</label>
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
        />
      </div>
    );
  }
}

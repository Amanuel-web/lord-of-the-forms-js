import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  state = {
    userDate: null,
  };

  setUserData = (userData) => {
    this.setState({ userData });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userData} />
        <ClassForm setUserData={this.setUserData} />
      </>
    );
  }
}

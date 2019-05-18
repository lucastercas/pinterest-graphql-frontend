import React, { Component } from "react";

export default class ProfilePage extends Component {
  render() {
    if (!this.props.match) {
      return null;
    }
    console.debug("Rendering Profile Page");
    return <div>{this.props.user ? this.props.user.email : "No Email"}</div>;
  }
}

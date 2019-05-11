import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default class Container extends Component {
  render() {
    const AppRouter = this.props.noRouter ? React.Fragment : Router;
    return (
      <AppRouter>
        <div className="App">{this.props.children}</div>
      </AppRouter>
    );
  }
}

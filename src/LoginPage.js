import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      done: false,
      errorMessage: ""
    };
  }

  handleChange = evt => {
    const value = evt.target.value;
    this.setState({
      email: value
    });
  };

  handleLogin = evt => {
    evt.preventDefault();
    if (!this.state.email) {
      this.setState({
        errorMessage: "Enter your Email"
      });
      return;
    }
    this.props
      .authenticate()
      .then(() => this.setState({ done: true, loading: false }))
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    if (!this.props.match) {
      return null;
    }
    return (
      <div className="login-page">
        <div>
          <div>Welcome to Pin Graphql</div>
        </div>
        <form onSubmit={this.handleLogin}>
          <div className="login-input">
            <label htmlFor="email"> Email: </label>
            <span>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </span>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default props => {
  return (
    <Route exact path="/login">
      {routerProps => <LoginPage {...props} {...routerProps} />}
    </Route>
  );
};

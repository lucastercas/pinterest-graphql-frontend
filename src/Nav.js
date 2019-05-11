import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Nav extends Component {
  render() {
    if (
      this.props.location.pathname === "/login" ||
      this.props.location.pathname === "/verify"
    ) {
      return null;
    }

    return (
      <nav className="nav">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/upload-pin">
          <button>Add a Pin</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </nav>
    );
  }
}

Nav = withRouter(Nav);

export default Nav;

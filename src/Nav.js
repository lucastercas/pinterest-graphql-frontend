import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
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
          <button className="btn-home">
            <i className="fa fa-home" />
          </button>
        </Link>
        <Link to="/upload-pin">
          <button className="btn-add-pin">
            <i className="fa fa-plus" />
          </button>
        </Link>
        <Link to="/profile">
          <button className="btn-profile">
            <i className="fa fa-user" />
          </button>
        </Link>
      </nav>
    );
  }
}

Nav = withRouter(Nav);

export default Nav;

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AddPinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
    };
  }

  addPin = evt => {
    evt.preventDefault();
    this.props.addPin({
      title: this.state.title,
      image: this.state.image,
    });
    this.setState({
      title: "",
      image: "",
    });
    this.props.history.push("/");
  };

  render() {
    if (!this.props.match) {
      return null;
    }
    console.debug("Rendering Add Pin");
    return (
      <div className="add-pin">
        {!this.props.authenticated ? (
          <div className="text-center">
            <h2>You have to Log In to post:</h2>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <div>
            <h3>Add Pin</h3>
            <form onSubmit={this.addPin}>
              <input
                type="text"
                value={this.state.title}
                onChange={evt => this.setState({ title: evt.target.value })}
                placeholder="Title"
                required
              />
              <input
                type="url"
                value={this.state.image}
                onChange={evt => this.setState({ image: evt.target.value })}
                placeholder="Image"
                required
              />
              <button>Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

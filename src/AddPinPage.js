import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class AddPinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      link: "",
      image: ""
    };
  }

  addPin = evt => {
    evt.preventDefault();
    this.props.addPin({
      title: this.state.title,
      link: this.state.link,
      image: this.state.image
    });
    this.setState({
      title: "",
      link: "",
      image: ""
    });
    this.props.history.push("/");
  };

  render() {
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
                value={this.state.link}
                onChange={evt => this.setState({ link: evt.target.value })}
                placeholder="Link"
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

export default ({ addPin = () => {}, ...props }) => (
  <Route
    path="/upload-pin"
    component={routerProps => (
      <AddPinPage {...routerProps} {...props} addPin={addPin} />
    )}
  />
);

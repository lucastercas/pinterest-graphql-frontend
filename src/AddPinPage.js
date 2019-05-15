import React, { Component } from "react";
import { Route } from "react-router-dom";

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
        <h3>Add Pin</h3>
        <h2>Auth: {this.props.authenticated}</h2>
        <form onSubmit={this.addPin}>
          <input
            type="text"
            value={this.state.title}
            onChange={evt => this.setState({ title: evt.target.value })}
            required
          />
          <input
            type="url"
            value={this.state.link}
            onChange={evt => this.setState({ link: evt.target.value })}
            required
          />
          <input
            type="url"
            value={this.state.image}
            onChange={evt => this.setState({ image: evt.target.value })}
            required
          />
          <button>Save</button>
        </form>
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

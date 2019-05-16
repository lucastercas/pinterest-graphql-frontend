import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class Pins extends Component {
  renderNoPins = () => {
    return (
      <div>
        <h3>There are no pins yet.</h3>
        {this.props.authenticated ? (
          <div>Create One</div>
        ) : (
          <div>Login to Create One</div>
        )}
      </div>
    );
  };

  render() {
    if (!this.props.match) {
      return null;
    }
    if (this.props.pins.length === 0) {
      return this.renderNoPins();
    } else {
      return (
        <div>
          <ul className="pins">
            {this.props.pins.map((pin, idx) => (
              <li className="pin" key={idx}>
                <a target="_blank" href={pin.link} rel="noopener noreferrer">
                  <img src={pin.image} alt="" />
                  <h4 className="title text-center">{pin.title}</h4>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default ({ pins = [], authenticated }) => {
  return (
    <Route exact path="/">
      {({ match }) => (
        <Pins pins={pins} authenticated={authenticated} match={match} />
      )}
    </Route>
  );
};

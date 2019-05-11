import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class Pins extends Component {
  render() {
    if(!this.props.match) {
      return null;
    }
    return (
      <div>
        <ul className="pins">
          {this.props.pins.map((pin, idx) => (
            <li className="pin" key={idx}>
              <a target="_blank" href={pin.link} rel="noopener noreferrer">
                <img src={pin.image} alt="" />
                <h4 className="title">{pin.title}</h4>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ({ pins = [] }) => {
  return (
    <Route exact path="/">
      {({ match }) => <Pins pins={pins} match={match} />}
    </Route>
  );
};

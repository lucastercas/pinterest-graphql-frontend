import React, { Component } from "react";

export default class Pins extends Component {
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
    console.log("Rendering Pins Page");
    if (this.props.pins.length === 0) {
      return this.renderNoPins();
    } else {
      return (
        <div>
          <ul className="pins">
            {this.props.pins.map((pin, idx) => (
              <li className="pin" key={idx}>
                <a
                  href={`${process.env.REACT_APP_URL}/pins/${pin.id}`}
                  rel="noopener noreferrer"
                >
                  <img src={pin.image} alt="" />
                  <div>
                    <h4 className="title text-center">{pin.title}</h4>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

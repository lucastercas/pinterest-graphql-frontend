import React, { Component } from "react";

export default class Pin extends Component {
  render() {
    if (!this.props.match) {
      return null;
    }
    return (
      <div>
        {this.props.pin ? (
          <img src={this.props.pin.image} alt="" />
        ) : (
          "No pin with this id"
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import CommentArea from "./CommentArea";

export default class Pin extends Component {
  render() {
    if (!this.props.match) {
      return null;
    }
    return (
      <div className="pin-page">
        {this.props.pin ? (
          <div className="pin">
            <div className="pin-image">
              <img src={this.props.pin.image} alt="" />
            </div>

            <div className="pin-info">
              <div className="pin-title">
                <h3>{this.props.pin.title}</h3>
              </div>
              <div className="comment-section">
                <CommentArea {...this.props} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="error">No Pins with this ID</h3>
          </div>
        )}
      </div>
    );
  }
}

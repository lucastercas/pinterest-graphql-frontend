import React, { Component } from "react";

export default class CommentsComponent extends Component {
  render() {
    if (this.props.comments.length === 0) {
      return (
          <div>No Comments</div>
      );
    }
    return (
      <ul>
        {this.props.comments.map((comment, idx) => (
          <li key={idx}>
            <div>
              <p>{comment.user_id}</p>
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
};

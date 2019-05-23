import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import  CommentsComponent from './CommentsComponent'

import { POST_COMMENT, COMMENTS_BY_PIN} from "./queries";

export default class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  handleChange = evt => {
    this.setState({
      comment: evt.target.value
    });
  };

  handleComment = evt => {
    console.log("Posting comment");
    evt.preventDefault();
    //this.props.postComment(this.state.comment)
  };

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
                {this.props.pin.id && (
                  <Query query={COMMENTS_BY_PIN} 
                    variables={{pin_id: this.props.pin.id}}>
                    {
                      ({data}) => (
                        <CommentsComponent
                          comments={data.commentsByPin || []}
                        />
                      )
                    }
                  </Query>
                )}

                {this.props.authenticated ? (
                  <Mutation mutation={POST_COMMENT}>
                    {postComment => (
                      <form onSubmit={(evt) => {
                        evt.preventDefault()
                        console.debug('Posting Comment')
                        postComment({
                          variables: {
                            content: this.state.comment,
                            pin_id: this.props.pin.id,
                            user_id: this.props.authenticated
                          }
                        })
                      }} >
                      <input
                        type=""
                        value={this.state.comment}
                        onChange={this.handleChange}
                      />
                      <button type="submit">Post Comment</button>
                    </form>
                    )}
                  </Mutation>
                ): (
                  <div>Login to post a comment</div>
                )}
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

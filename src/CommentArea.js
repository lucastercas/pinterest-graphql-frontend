import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";

import {
  POST_COMMENT,
  COMMENTS_BY_PIN,
  COMMENTS_SUBSCRIPTIONS
} from "./queries";

class CommentsComponent extends Component {
  componentDidMount() {
    console.log(this.props.comments)
    this.props.subscribeToMore();
  }
  render() {
    if (this.props.comments.length === 0) {
      return <div>No Comments</div>;
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
}

class PostCommentComponent extends Component {
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

  render() {
    if (this.props.authenticated) {
      return (
        <div>
          <Mutation mutation={POST_COMMENT}>
            {postComment => (
              <form
                onSubmit={evt => {
                  evt.preventDefault();
                  postComment({
                    variables: {
                      content: this.state.comment,
                      pin_id: this.props.pin.id
                    }
                  });
                }}
              >
                <input
                  value={this.state.comment}
                  onChange={this.handleChange}
                />
                <button type="submit">Post Comment</button>
              </form>
            )}
          </Mutation>
        </div>
      );
    } else {
      return <div>Login to Post a Comment</div>;
    }
  }
}

export default class CommentArea extends Component {
  render() {
    return (
      <div>
        {this.props.pin.id && (
          <CommentsListQuery {...this.props}>
            {({ commentsByPin, subscribeToMore }) => (
              <div>
                <CommentsComponent
                  comments={commentsByPin || []}
                  subscribeToMore={subscribeToMore}
                />
              </div>
            )}
          </CommentsListQuery>
        )}
        <PostCommentComponent {...this.props} />
      </div>
    );
  }
}

class CommentsListQuery extends Component {
  render() {
    return (
      <Query query={COMMENTS_BY_PIN} variables={{ pin_id: this.props.pin.id }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return <div>Loading Comment</div>;
          }
          if (error) {
            return <div>Error Getting Comments</div>;
          }
          const subscribeToMoreComments = () => {
            console.log("Subscribing to more comments");
            return subscribeToMore({
              document: COMMENTS_SUBSCRIPTIONS,
              updateQuery: (prev, { subscriptionData }) => {
                console.log("Updating Query");
                console.log("Prev: ", prev);
                console.log("SubscriptionData: ", subscriptionData);
                if (!subscriptionData || !subscriptionData.data.commentPosted) {
                  console.log("Returning Prev");
                  return prev;
                }
                const newComment = subscriptionData.data.commentPosted;
                const newComments = Object.assign({}, prev, {
                  commentsByPin: [...prev.commentsByPin, newComment]
                });
                console.log("New Comments: ", newComments);
                return newComments;
              }
            });
          };
          return this.props.children({
            commentsByPin: data.commentsByPin,
            subscribeToMore: subscribeToMoreComments
          });
        }}
      </Query>
    );
  }
}

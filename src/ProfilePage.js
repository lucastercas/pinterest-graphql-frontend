import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class ProfilePage extends Component {
  render() {
    if (!this.props.match) {
      return null;
    }
    return (
      <div>
        <div>
          {this.props.user ? this.props.user.email : 'No Email'}
        </div>
      </div>
    );
  }
}

export default ({ token, user }) => {
  return (
    <Route exact path="/profile">
      {({ match }) => <ProfilePage token={token} user={user} match={match} />}
    </Route>
  );
};

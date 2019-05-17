import React, { Component } from "react";

export default class ProfilePage extends Component {
  render() {
    if (!this.props.match) {
      return null;
    }
    console.debug('Rendering Profile Page')
    return (
      <div>
        iaeiaeiae
        <div>
          {this.props.user ? this.props.user.me.email : 'No Email'}
        </div>
      </div>
    );
  }
}

  /*
export default ({ token, user }) => {
  return (
    <Route exact path="/profile">
      {({ match }) => <ProfilePage token={token} user={user} match={match} />}
    </Route>
  );
};
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import ProfilePage from "./ProfilePage";
import { ME } from "./queries";

export default class ProfilePageContainer extends Component {
  render() {
    console.debug("Rendering Profile Container");
    if (this.props.authenticated) {
      return (
        <Query query={ME}>
          {({ data }) => {
            return <ProfilePage {...this.props} user={data.me || []} />;
          }}
        </Query>
      );
    }
    return (
      <div>
        You are not logged in:
        <Link to="/login">
          <button>Login Again</button>
        </Link>
      </div>
    );
  }
}

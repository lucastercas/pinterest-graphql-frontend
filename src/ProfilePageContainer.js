import React, { Component } from "react";
import { Query } from "react-apollo";

import ProfilePage from "./ProfilePage";
import { ME } from "./queries";

export default class ProfilePageContainer extends Component {
  test = (data) =>{
    console.log('iae')
    console.log(data.me)
  }
  render() {
    return (
      <Query query={ME} fetchPolicy="network-only">
        {({data}) => {
          return (
            <div>
              <ProfilePage token={this.props.token} user={data.me} />
              { this.test(data)}
            </div>
          );
        }}
      </Query>
    );
  }
}

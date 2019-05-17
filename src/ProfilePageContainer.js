import React, { Component } from "react";
import { Query } from "react-apollo";
import { Route, Link } from "react-router-dom";

import ProfilePage from "./ProfilePage";
import { ME } from "./queries";

export default class ProfilePageContainer extends Component {
  render() {
    console.debug('Rendering Profile Container')
    return (
      <Query query={ME}>
        {({data}) => {
          return (
            <div>
              <Route exact path="/profile">
                { 
                  ({match} ) => (
                    <ProfilePage token={this.props.token} match={match} 
                      user={data}
                    />
                  )
                }
              </Route>
            </div>
          );
        }}
      </Query>
    );
  }
}

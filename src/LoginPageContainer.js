import { Mutation } from "react-apollo";
import React, { Component } from "react";

import LoginPage from "./LoginPage";
import { CREATE_SHORT_LIVED_TOKEN } from "./queries";

export default class LoginPageContainer extends Component {
  render() {
    console.debug("Rendering Login Page Container");
    if (this.props.authenticated) {
      return ( 
        <div>You are already logged in</div>
      );
    } else {
      return (
        <Mutation mutation={CREATE_SHORT_LIVED_TOKEN}>
          {createShortLivedToken => (
            <LoginPage
              {...this.props}
              authenticate={async email => {
                const result = await createShortLivedToken({
                  variables: { email: email }
                });
                return result;
              }}
            />
          )}
        </Mutation>
      );
    }
  }
}

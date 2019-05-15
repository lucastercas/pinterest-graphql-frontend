import { Mutation } from "react-apollo";
import React, { Component } from "react";

import LoginPage from "./LoginPage";
import { CREATE_SHORT_LIVED_TOKEN } from "./queries";

export default class LoginPageContainer extends Component {
  render() {
    //console.log("Rendering Login Page Container");
    return (
      <Mutation mutation={CREATE_SHORT_LIVED_TOKEN}>
        {createShortLivedToken => (
          <LoginPage
            authenticate={async email => {
              console.log("Email: ", email);
              const result = await createShortLivedToken({
                variables: { email: email }
              });
              console.log("Result: ", result);
              return result;
            }}
          />
        )}
      </Mutation>
    );
  }
}

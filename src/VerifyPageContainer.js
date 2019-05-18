import React, { Component } from "react";
import { Mutation } from "react-apollo";
import VerifyPage from "./VerifyPage";

import { CREATE_LONG_LIVED_TOKEN, ME } from "./queries";

export default class VerifyPageContainer extends Component {
  render() {  
    console.debug("Rendering Verify Page Container");
    return (
      <Mutation
        mutation={CREATE_LONG_LIVED_TOKEN}
        update={(cache, { data }) => {
          console.log("Updating")
          if (data && data.createLongLivedToken) {
            this.props.onToken(data.createLongLivedToken);
          }
        }}
      >
        {createLongLivedToken => (
          <VerifyPage
            verify={shortLivedToken =>
              createLongLivedToken({
                variables: {
                  short_token: shortLivedToken
                },
                refetchQueries: [{ query: ME, }]
              })
            }
            {...this.props}
          />
        )}
      </Mutation>
    );
  }
}

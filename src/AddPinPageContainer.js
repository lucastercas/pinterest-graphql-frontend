import React, { Component } from "react";
import { Mutation } from "react-apollo";

import AddPinPage from "./AddPinPage";
import { ADD_PIN, LIST_PINS } from "./queries";

export default class AddPinPageContainer extends Component {
  render() {
    console.debug('Rendering Add Pin Container')
    return (
      <Mutation mutation={ADD_PIN}>
        {addPin => (
          <AddPinPage
            authenticated={this.props.authenticated}
            addPin={pin =>
              addPin({
                variables: { pin: pin },
                refetchQueries: [{ query: LIST_PINS }]
              })
            }
            {...this.props}
          />
        )}
      </Mutation>
    );
  }
}

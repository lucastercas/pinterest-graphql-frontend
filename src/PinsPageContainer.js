import React, { Component } from "react";
import { Query } from "react-apollo";

import PinsPage from "./PinsPage";
import { LIST_PINS } from "./queries";

export default class PinsContainer extends Component {
  render() {
    return (
      <Query query={LIST_PINS}>
        {({ data }) => {
          return (
            <PinsPage
              pins={data.pins}
              authenticated={this.props.authenticated}
            />
          );
        }}
      </Query>
    );
  }
}

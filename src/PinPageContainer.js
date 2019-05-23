import React, { Component } from "react";
import { Query } from "react-apollo";

import PinPage from "./PinPage";

import { GET_PIN } from "./queries";

export default class PinPageContainer extends Component {
  render() {
    return (
      <Query query={GET_PIN} variables={{ id: this.props.match.params.id }}>
        {({ data }) => {
          return <PinPage {...this.props} pin={data.pinById || []} />;
        }}
      </Query>
    );
  }
}

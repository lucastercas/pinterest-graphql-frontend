import React, { Component } from "react";
import { Query } from "react-apollo";
import { Route, Link } from "react-router-dom";

import PinsPage from "./PinsPage";
import { LIST_PINS } from "./queries";

export default class PinsContainer extends Component {
  render() {
    console.debug('Rendering Pins Container')
    return (
      <Query query={LIST_PINS}>
        {({ data }) => {
          return (
            <PinsPage
              pins={data.pins || []}
              authenticated={this.props.authenticated}
              match={this.props.match}
            />
          )
        }}
      </Query>
    );
  }
}

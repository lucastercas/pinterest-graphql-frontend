import React, { Component } from "react";
import { Query } from "react-apollo";

import PinsPage from "./PinsPage";
import { LIST_PINS, PINS_SUBSCRIPTIONS } from "./queries";

class PinsListQuery extends React.Component {
  render() {
    return (
      <Query query={LIST_PINS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return <div>Loading Pins</div>;
          }
          if (error) {
            return <div>Error Getting Pins</div>;
          }
          const subscribeToMorePins = () => {
            console.log("Subscribing to more pins");
            return subscribeToMore({
              document: PINS_SUBSCRIPTIONS,
              updateQuery: (prev, { subscriptionData }) => {
                console.log("Updating Query");
                if (!subscriptionData || !subscriptionData.data.pinAdded) {
                  console.log("Returning Prev");
                  return prev;
                }
                const newPinAdded = subscriptionData.data.pinAdded;
                return Object.assign({}, prev, {
                  pins: [...prev.pins, newPinAdded]
                });
              }
            });
          };
          return this.props.children({
            pins: data.pins,
            subscribeToMore: subscribeToMorePins
          });
        }}
      </Query>
    );
  }
}

class PinsContainer extends Component {
  componentDidMount() {
    console.log("Pins Container Mounted");
    this.props.subscribeToMore();
  }
  render() {
    return <PinsPage pins={this.props.pins || []} />;
  }
}

export default () => (
  <PinsListQuery>
    {({ pins, subscribeToMore }) => (
      <PinsContainer pins={pins} subscribeToMore={subscribeToMore} />
    )}
  </PinsListQuery>
);

import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, Observable, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router-dom";

import asyncComponent from "./AsyncComponent";
import Nav from "./Nav";

const AsyncLoginPageContainer = asyncComponent(() =>
  import("./LoginPageContainer")
);
const AsyncPinsPageContainer = asyncComponent(() =>
  import("./PinsPageContainer")
);
const AsyncPinPageContainer = asyncComponent(() =>
  import("./PinPageContainer")
);
const AsyncProfilePagecontainer = asyncComponent(() =>
  import("./ProfilePageContainer")
);
const AsyncAddPinsContainer = asyncComponent(() =>
  import("./AddPinPageContainer")
);
const AsyncVerifyPageContainer = asyncComponent(() =>
  import("./VerifyPageContainer")
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const long_token = localStorage.getItem("long_token");
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkErrors }) => {
          if (graphQLErrors) {
          }
          if (networkErrors) {
          }
        }),
        new ApolloLink((operation, forward) => {
          const request = async operation => {
            if (this.state.long_token) {
              operation.setContext({
                headers: {
                  Authorization: this.state.long_token
                }
              });
            }
          };
          return new Observable(observer => {
            let handle;
            Promise.resolve(operation)
              .then(oper => request(oper))
              .then(() => {
                handle = forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                });
              })
              .catch(observer.error.bind(observer));
            return () => {
              if (handle) handle.unsubscribe();
            };
          });
        }),
        split(
          ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (
              kind === "OperationDefinition" && operation === "subscription"
            );
          },
          new WebSocketLink({
            uri: process.env.REACT_APP_GRAPHQL_URL.replace(
              "https://",
              "wss://"
            ),
            options: {
              reconnect: true,
              connectionParams: {
                authToken: long_token
              }
            }
          }),
          new HttpLink({
            uri: process.env.REACT_APP_GRAPHQL_URL,
            credentials: "same-origin"
          })
        )
      ])
    });
    this.state = {
      long_token: long_token,
      client: client
    };
  }

  logout = () => {};

  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <Router>
          <Switch>
            <Route path={["/", "/pins"]} exact>
              {routerProps => (
                <AsyncPinsPageContainer
                  {...routerProps}
                  authenticated={this.state.long_token}
                />
              )}
            </Route>
            <Route path="/profile" exact>
              {routerProps => (
                <AsyncProfilePagecontainer
                  {...routerProps}
                  authenticated={this.state.long_token}
                />
              )}
            </Route>
            <Route path="/upload-pin" exact>
              {routerProps => (
                <AsyncAddPinsContainer
                  {...routerProps}
                  authenticated={this.state.long_token}
                />
              )}
            </Route>
            <Route exact path="/verify">
              {routerProps => (
                <AsyncVerifyPageContainer
                  {...routerProps}
                  onToken={long_token => {
                    localStorage.setItem("long_token", long_token);
                    this.setState({ long_token: long_token });
                  }}
                />
              )}
            </Route>
            <Route exact path="/login">
              {routerProps => (
                <AsyncLoginPageContainer
                  authenticated={this.state.long_token}
                  {...routerProps}
                />
              )}
            </Route>
            <Route path="/pins/:id">
              {routerProps => (
                <AsyncPinPageContainer
                  authenticated={this.state.long_token}
                  {...routerProps}
                />
              )}
            </Route>
          </Switch>
          <Nav authenticated={this.state.long_token} />
        </Router>
      </ApolloProvider>
    );
  }
}

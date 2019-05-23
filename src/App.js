import React from "react";
import ApolloClient from "apollo-boost";
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
const AsyncPinPageContainer = asyncComponent(() => import("./PinPageContainer"));
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
    this.state = {
      long_token: null,
      client: new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_URL,
        request: operation => {
          if (this.state.long_token) {
            operation.setContext({
              headers: { Authorization: this.state.long_token }
            });
          }
        }
      })
    };
  }

  componentDidMount() {
    console.log("App Did Mount");
    const long_token = localStorage.getItem("long_token");
    console.log("Found Long Token");
    if (long_token) {
      this.setState({ long_token: long_token });
    }
    this.setState({
      client: new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_URL,
        request: operation => {
          if (this.state.long_token) {
            operation.setContext({
              headers: { Authorization: this.state.long_token }
            });
          }
        }
      })
    });
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
              {routerProps => <AsyncPinPageContainer 
                authenticated={this.state.long_token}
                {...routerProps}
              />}
            </Route>
          </Switch>
          <Nav authenticated={this.state.long_token} />
        </Router>
      </ApolloProvider>
    );
  }
}

import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Container from "./Container";
import LoginPageContainer from "./LoginPageContainer";
import PinsPageContainer from "./PinsPageContainer";
import AddPinPageContainer from "./AddPinPageContainer";
import VerifyPageContainer from "./VerifyPageContainer";
import ProfilePageContainer from './ProfilePageContainer'
import Nav from "./Nav";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      long_token: null,
      client: new ApolloClient({
        uri: process.env.REACT_APP_API_URL,
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
    console.log('Found Long Token')
    if (long_token) {
      this.setState({ long_token: long_token });
    }
    this.setState({
      client: new ApolloClient({
        uri: process.env.REACT_APP_API_URL,
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
        <Container>
          <PinsPageContainer authenticated={this.state.long_token} />
          <AddPinPageContainer authenticated={this.state.long_token} />
          <LoginPageContainer />
          <ProfilePageContainer token={this.state.long_token}/>
          <VerifyPageContainer
            onToken={long_token => {
              console.log("Setting Long Token");
              localStorage.setItem("long_token", long_token);
              this.setState({ long_token: long_token });
            }}
          />
          <Nav authenticated={this.state.long_token} />
        </Container>
      </ApolloProvider>
    );
  }
}

import React from "react";
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

import LoginPage from "./LoginPage";
import Pins from "./Pins";
import AddPin from "./AddPin";
import Nav from "./Nav";
import Container from "./Container";

const client = new ApolloClient({
  uri: process.ENV.REACT_APP_API_URL
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
      authenticated: false,
      user: this.getInitialState()
    };
  }

  componentDidMount() {
    client.query({
      query: gql`
      {
        pins {
          title
          image
          link
        }
      }
      `
    })
      .then(results => this.setState({pins: results.data.pins}))
  }

  addPin = pin => {
    this.setState(({ pins }) => ({
      pins: pins.concat([pin])
    }));
  };

  getInitialState = () => {
    const option = localStorage.getItem("user");
    return option;
  };

  verify = () => {
    return sucess().then(token =>
      this.setState({
        authenticated: true,
        user: {
          email: "lucastercas@gmail.com"
        }
      })
    );
  };

  authenticate = user => {
    localStorage.setItem("user", user);
    this.setState({ user: user });
    return Promise.resolve({});
  };

  logout = () => {};

  render() {
    return (
      <Container>
        <Pins pins={this.state.pins} />
        <AddPin addPin={this.addPin} authenticated={this.authenticated}/>
        <LoginPage authenticate={this.authenticate} />
        <Nav />
      </Container>
    );
  }
}

function wait(time) {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
}

function sucess() {
  return wait(1000).then(() => "long-token");
}

const mockPins = [
  {
    link: "https://pinterest.com/pin/637540890973869441/",
    image:
      "https://i.pinimg.com/564x/5a/22/2c/5a222c93833379f00777671442df7cd2.jpg",
    title: "Modern"
  },
  {
    link: "https://pinterest.com/pin/487585097141051238/",
    image:
      "https://i.pinimg.com/564x/85/ce/28/85ce286cba63daf522464a7d680795ba.jpg",
    title: "Broadcat Clean Titles"
  },
  {
    link: "https://pinterest.com/pin/618611698790230574/",
    image:
      "https://i.pinimg.com/564x/00/7a/2e/007a2ededa8b0ce87e048c60fa6f847b.jpg",
    title: "Drawing"
  }
];

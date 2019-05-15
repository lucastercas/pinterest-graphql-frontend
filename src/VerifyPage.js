import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import qs from "query-string";

class VerifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "verifying"
    };
  }

  componentDidMount() {
    if (this.props.match) {
      const query = qs.parse(this.props.location.search);
      console.log('Query: ', query);
      this.props
      // Send the short token to back-end, so it can be
      // verified
        .verify(query.token)
        .then(() => {
          this.setState({ status: "success" });
          setTimeout(() => this.props.history.push("/"), 1000);
        })
        .catch(() => {
          this.setState({ status: "failure" });
        });
    }
  }

  render() {
    //console.log("Rendering Verify Page");
    if (!this.props.match) {
      return null;
    }
    return (
      <div className="verify-page">
        {this.state.status === "verifying" && <h3>Verifying...</h3>}
        {this.state.status === "success" && <h3>Success!</h3>}
        {this.state.status === "failure" && (
          <div>
            <h3>Email Verification Failed</h3>
            <Link to="/login">
              <button>Login Again</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default props => (
  <Route exact path="/verify">
    {routerProps => <VerifyPage {...props} {...routerProps} />}
  </Route>
);

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";

class SocialLogin extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
    };
  }

  responseGoogle = (response) => {
    const tokenId = response.tokenId;
    const user = {
      tokenId: tokenId,
    };

    socialLogin(user).then((data) => {
      if (data.error) {
        console.log("Error Login. Please try again..");
      } else {
        authenticate(data, () => {
          console.log("social login res from api", data);
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  };
  render() {
    // redirect
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
    return (
      <GoogleLogin
        clientId="649697499780-t534ft4vj306ncsljl55fk1etkvjbli8.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

export default SocialLogin;

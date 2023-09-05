import React from "react";
import { Redirect } from "react-router-dom";
import OktaSignInWidget from "../components/OktaSignInWidget";
import { useOktaAuth } from "@okta/okta-react";
import { Image } from "semantic-ui-react";

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("Sign in error:", err);
  };

  if (!authState) {
    return <div>Loading ... </div>;
  }

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <div className="login-wrapper">
      <div className="image-wrapper">
        <Image
          className="humberImg"
          src="https://login.humber.ca/cas/img/3284.jpg"
        />
      </div>
      <div className="login-widget">
        <div className="widgetRender">
          <OktaSignInWidget
            config={config}
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

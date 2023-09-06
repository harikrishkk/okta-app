import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading ...</div>;
  }

  return authState &&
    authState.isAuthenticated &&
    authState.idToken.claims &&
    !authState.idToken.claims.userConsent ? (
    <>
      <Redirect to={{ pathname: "/terms" }} />
    </>
  ) : (
    <>
      <div className="general-wrapper">
        <h1> Humber Okta Integration Demo</h1>
      </div>
    </>
  );
};

export default Home;

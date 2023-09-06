import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import config from "./config";
import "./App.css";
import Navbar from "./components/Navbar";
import Terms from "./pages/Terms";
import Conflict from "./pages/Conflict";
import Registration from "./pages/Registration";

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "", window.location.origin));
  };

  return (
    <div>
      <header>
        <Security
          oktaAuth={oktaAuth}
          onAuthRequired={customAuthHandler}
          restoreOriginalUri={restoreOriginalUri}
        >
          <Navbar />
          <Route path="/" exact component={Home} />
          <SecureRoute path="/protected" component={Protected} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/login/callback" component={LoginCallback} />
          <Route path="/terms" component={Terms} />
          <Route path="/conflict" component={Conflict} />
          <Route path="/registration" component={Registration} />
        </Security>
      </header>
    </div>
  );
};

export default App;

import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Image, Menu } from "semantic-ui-react";
import logo from "../logo.svg";

const Navbar = ({ setCorsErrorModalOpen }) => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();

  // Note: Can't distinguish CORS error from other network errors
  const isCorsError = (err) =>
    err.name === "AuthApiError" &&
    !err.errorCode &&
    err.xhr.message === "Failed to fetch";

  const login = async () => {
    console.log("Navigate to profile..");
    history.push("/login");
  };

  const logout = async () => {
    const basename =
      window.location.origin + history.createHref({ pathname: "/" });
    console.log("base name is", basename);
    try {
      await oktaAuth.signOut({ postLogoutRedirectUri: basename });
    } catch (err) {
      if (isCorsError(err)) {
        setCorsErrorModalOpen(true);
      } else {
        throw err;
      }
    }
  };

  if (!authState) {
    return null;
  }

  return (
    <div>
      <Menu fixed="top" inverted>
        <Menu.Item header>
          <Link to="/">Humber Okta Demo</Link>
        </Menu.Item>
        <Menu.Item header>
          &nbsp;
          <Link to="/destiny"> Destiny</Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Menu position="right">
            {!authState.isPending && !authState.isAuthenticated && (
              <Menu.Item onClick={login}>Login</Menu.Item>
            )}
          </Menu.Menu>
          {authState.isAuthenticated && (
            <Menu.Item id="logout-button" onClick={logout}>
              Logout
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};
export default Navbar;

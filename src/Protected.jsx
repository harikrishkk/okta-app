import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';

const Protected = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth
        .getUser()
        .then((info) => {
          console.log('INFO>>>', info);
          setUserInfo(info);
          if (!info.tncAccepted) {
            history.push('/terms');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [authState, oktaAuth, history]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user info ...</p>
      </div>
    );
  }

  return (
    <div className="general-wrapper">
      <div>
        <p id="welcome">Welcome, &nbsp;{userInfo.name}!</p>
        <p>
          You have successfully authenticated against your Okta org, and have
          been redirected back to this application.
        </p>
      </div>
    </div>
  );
};

export default Protected;

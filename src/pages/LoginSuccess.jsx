import React from "react";
import { Message } from "semantic-ui-react";

const LoginSuccess = () => {
  return (
    <div className="general-wrapper">
      <Message color="green">
        <Message.Header>Success!</Message.Header>
        <p> The flow is complete! </p>
      </Message>
    </div>
  );
};

export default LoginSuccess;

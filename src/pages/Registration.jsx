import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";
import TermsConditions from "../components/TermsConditions";
import logo from "../humber.svg";
import { Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userConsent: false,
  });
  const appUrl = window.location.search;
  const redirectTo = appUrl.split("=")[1];

  const [user, setUser] = useState(null);
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccept = (isAccepted) => {
    setFormData({ ...formData, userConsent: isAccepted });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sswsToken = "00t83Kb-lDIjVUy2Y7jXpBUoxm1pdTTxnG9Z7vioV3";
    const headers = {
      Authorization: `SSWS ${sswsToken}`,
    };

    try {
      const response = await axios.post(
        "https://humber-poc-cgi.okta.com/api/v1/users?activate=true",
        {
          profile: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            login: formData.email,
            userConsent: formData.userConsent,
          },
        },
        { headers }
      );
      if (response.status === 200) {
        console.log("User registration successful:", response.data);
        setUser(response.data);
        // reset user after submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        });
        history.push(`/${redirectTo}`);
      } else {
        console.error("User registration error:", response.data);
      }
    } catch (error) {
      console.error("User registration error:", error);
    }
  };
  return (
    <div className="registration-wrapper">
      <Image src={logo} size="medium" />

      <h1> Register</h1>
      <hr style={{ marginBottom: "30px" }} />
      {!!user && (
        <AlertMessage
          header={`User registered!`}
          message={`The user id is ${user.id} with the status of ${user.status}. `}
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="text"
            id="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <TermsConditions
            onAcceptCondition={handleAccept}
            submitted={!!user}
          />
        </Form.Field>

        <Button style={{ marginTop: "30px" }} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Registration;

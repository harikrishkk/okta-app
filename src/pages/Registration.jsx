import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";
import TermsConditions from "../components/TermsConditions";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAccepted: false,
  });
  const [user, setUser] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccept = (isAccepted) => {
    setFormData({ ...formData, isAccepted: isAccepted });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sswsToken = "00t_PjmAq7If0E8mpUMf4KsEYct_hh3axjScjgwfo6";
    const headers = {
      Authorization: `SSWS ${sswsToken}`,
    };

    try {
      const response = await axios.post(
        "https://dev-84219609.okta.com/api/v1/users?activate=true",
        {
          profile: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            login: formData.email,
            tncAccepted: formData.isAccepted,
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
      } else {
        console.error("User registration error:", response.data);
      }
    } catch (error) {
      console.error("User registration error:", error);
    }
  };
  return (
    <div className="general-wrapper">
      <h1> User Registration</h1>
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
          <TermsConditions onAcceptCondition={handleAccept} />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Registration;

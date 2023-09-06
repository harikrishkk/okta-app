import React from "react";
import { Link } from "react-router-dom";
const App2 = () => {
  return (
    <div className="general-wrapper">
      <h1> New application</h1>
      <Link to="/registration?redirect=newapp">Register new User</Link>
    </div>
  );
};

export default App2;

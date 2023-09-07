import React from "react";
import { Link } from "react-router-dom";

const App2 = () => {
  return (
    <div className="general-wrapper destiny-wrapper">
      <div className="destiny-link">
        <Link className="custom-link" to="/registration?redirect=destiny">
          Register new User
        </Link>
      </div>
    </div>
  );
};

export default App2;

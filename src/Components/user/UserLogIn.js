import React from "react";
import { Link } from "react-router-dom";
export default function UserLogIn() {
  return (
    <div>
      <h4>User login</h4>
      <Link to="/userDashBoard" style={{ textDecoration: "none" }}>
        <button type="button">Go to DashBoard</button>
      </Link>
    </div>
  );
}

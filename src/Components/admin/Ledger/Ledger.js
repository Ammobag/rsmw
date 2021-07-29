import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Ledger.css";

function Ledger() {
  return (
    <body>
      <nav class="sidenav">
        <menu>
          <a href="#">Ledger</a>
          <a href="#">Contents</a>
          <a href="#">Notice Board</a>
          <a href="#">Manage Users</a>
          <a href="#">Manage Content</a>
        </menu>
      </nav>

      <div className="main">...</div>
    </body>
  );
}

export default Ledger;

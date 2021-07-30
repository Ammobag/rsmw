import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./DashBoard.css";
import Ledger from "../Ledger/Ledger";
import Complaints from "../Complaints/Complaints";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import ManageUsers from "../ManageUsers/ManageUsers";
import ManageContent from "../ManageContent/ManageContent";

function Dashboard() {
  return (
    <body>
      <nav className="sidenav">
        <menu>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div>Ledger</div>
          </Link>
          <Link to="/dashboard/complaints" style={{ textDecoration: "none" }}>
            <div>Complaints</div>
          </Link>
          <Link to="/dashboard/noticeBoard" style={{ textDecoration: "none" }}>
            <div>NoticeBoard</div>
          </Link>
          <Link to="/dashboard/manageUsers" style={{ textDecoration: "none" }}>
            <div>Manage Users</div>
          </Link>
          <Link
            to="/dashboard/manageContent"
            style={{ textDecoration: "none" }}
          >
            <div>Manage Content</div>
          </Link>
        </menu>
      </nav>
      <div className="main">
        <Switch>
          <Route path="/dashboard" component={Ledger} exact />
          <Route path="/dashboard/complaints" component={Complaints} />
          <Route path="/dashboard/noticeBoard" component={NoticeBoard} />
          <Route path="/dashboard/manageUsers" component={ManageUsers} />
          <Route
            path="/dashboard/manageContent"
            component={ManageContent}
            exact
          />
        </Switch>
      </div>
    </body>
  );
}

export default Dashboard;

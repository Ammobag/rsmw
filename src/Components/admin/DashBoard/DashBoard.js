import React from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import "./DashBoard.css";
import Ledger from "../Ledger/Ledger";
import Complaints from "../Complaints/Complaints";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import ManageUsers from "../ManageUsers/ManageUsers";
import ManageContent from "../ManageContent/ManageContent";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";
import logout from "../../functions/logout"

function Dashboard() {
  const history = useHistory();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log("User Check : ")
      if(uid === "6cryi8fnJySKAUBgfq6gPN49Gax1"){
        console.log(uid)

      }else{
        history.replace("/admin");
      }
    }else{
      history.replace("/admin");
    }
  });
  
  return (
    <div className="body">
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
          <button type="button" onClick={()=>logout()}>Log Out</button>
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
    </div>
  );
}

export default Dashboard;

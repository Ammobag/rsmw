import { React, useState } from "react";
import "./UserDashBoard.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import ErrorBoundary from "../functions/ErrorBoundary";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import logout from "../functions/logout";

export default function UserNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const history = useHistory();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log("User Check : ");
      if (uid !== undefined) {
        console.log(uid);
      } else {
        history.replace("/");
      }
    } else {
      history.replace("/");
    }
  });
  const openNav = {
    width: "300px",
  };
  const closeNav = {
    width: "0px",
  };

  console.log(isNavOpen);
  return (
    <ErrorBoundary>
    <div>
      <div
        id="mySidenav"
        className="sidenav"
        style={isNavOpen ? openNav : closeNav}
      >
        <div
          className="closebtn"
          onClick={() => setIsNavOpen(false)}
          style={{ cursor: "pointer" }}
        >
          X
        </div>

        <Link to="/feed" style={{ textDecoration: "none" }}>
          <div>Feed</div>
        </Link>

        <Link
          to="/transactions"
          style={{ textDecoration: "none" }}
        >
          <div>Transactions</div>
        </Link>

        <Link
          to="/noticeBoard"
          style={{ textDecoration: "none" }}
        >
          <div>Notice Board</div>
        </Link>

        <Link to="/complaints" style={{ textDecoration: "none" }}>
          <div>Complaints</div>
        </Link>

        <Link
          to="/classifiedSection"
          style={{ textDecoration: "none" }}
        >
          <div>Classified Section</div>
        </Link>
      </div>

      <div className="navbar">
        <button type="button" onClick={() => setIsNavOpen(true)}>
          Open
        </button>
        <button type="button" onClick={() => logout()}>
          Log Out
        </button>
      </div>
      <div>
        <Switch>
          {/* <Route path="" component={UserFeed} exact />
          <Route
            path="/userDashBoard/transactions"
            component={UserTransactions}
          />
          <Route
            path="/userDashBoard/noticeBoard"
            component={UserNoticeBoard}
          />
          <Route path="/userDashBoard/complaints" component={UserComplaints} />
          <Route
            path="/userDashBoard/classifiedSection"
            component={UserClassifiedSection}
          /> */}
        </Switch>
      </div>
    </div>
    </ErrorBoundary>
  );
}

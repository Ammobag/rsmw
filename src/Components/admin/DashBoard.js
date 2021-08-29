import React, { useState } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import styles from "./DashBoard.module.css";
import Ledger from "./Ledger";
import Complaints from "./Complaints";
import NoticeBoard from "./NoticeBoard";
import ManageUsers from "./ManageUsers";
import ManageContent from "./ManageContent";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import AddUsers from "./AdminActions/AddUsers";
import AddTransaction from "./AdminActions/AddTransaction";
import AddNotification from "./AdminActions/AddNotification";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import AddEvent from "./AdminActions/AddEvent";
import Events from "./Events";

function Dashboard() {
  const history = useHistory();
  const [isNavOpen, setIsNavOpen] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log("User Check : ");
      if (uid === "6cryi8fnJySKAUBgfq6gPN49Gax1") {
        console.log(uid);
      } else {
        console.log("User : " + user.uid);
        history.replace("/admin");
      }
    }
  });
  const openNav = {
    width: "400px",
  };
  const closeNav = {
    width: "0px",
  };
  return (
    <div className={styles.body}>
      <div className={styles.hamburger}>
        <MenuIcon
          onClick={() => setIsNavOpen(true)}
          style={{
            color: "#000000",
          }}
        />
      </div>
      <div className={styles.sidenav} style={isNavOpen ? openNav : closeNav}>
        <ArrowBackIcon
          className={styles.closebtn}
          onClick={() => setIsNavOpen(false)}
          style={{ cursor: "pointer", color: "#ffffff" }}
        />
        <section>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Ledger</div>
          </Link>

          <Link
            to="/dashboardcomplaints"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Complaints</div>
          </Link>

          <Link
            to="/dashboardnoticeBoard"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Notice Board</div>
          </Link>

           <Link
            to="/dashboardevents"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Events</div>
          </Link>

          <Link
            to="/dashboardmanageUsers"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Manage Users</div>
          </Link>

          <Link
            to="/dashboardmanageContent"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Manage Content</div>
          </Link>
        </section>
      </div>
      <div className={styles.main}>
        <Switch>
          <Route path="/dashboard" component={Ledger} exact />
          <Route path="/dashboardcomplaints" component={Complaints} />
          <Route path="/dashboardadduser" component={AddUsers} />
          <Route path="/dashboardaddevent" component={AddEvent} />
          <Route path="/dashboardaddTransaction" component={AddTransaction} />
          <Route
            path="/dashboardaddNotification"
            component={AddNotification}
          />
          <Route path="/dashboardnoticeBoard" component={NoticeBoard} />
          <Route path="/dashboardevents" component={Events} />
          <Route path="/dashboardmanageUsers" component={ManageUsers} />
          <Route path="/dashboardmanageContent" component={ManageContent} />
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;

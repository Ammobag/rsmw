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
import AddImportantNotice from "./AdminActions/AddImportantNotice";
import AddNotification from "./AdminActions/AddNotification";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import AddEvent from "./AdminActions/AddEvent";
import Events from "./Events";
import ManageContractors from "./ManageContractors";
import ManageTenders from "./ManageTenders";
import ManageImportantNotices from "./ManageImportantNotices";

function Dashboard() {
  const history = useHistory();
  const [isNavOpen, setIsNavOpen] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log("User Check : ");
      if (uid === "IkezoAoumCQvI586zQKCI68yBnH2") {
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
            to="/dashboard/complaints"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Complaints</div>
          </Link>

          <Link
            to="/dashboard/noticeBoard"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Notice Board</div>
          </Link>

          <Link
            to="/dashboard/events"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Events</div>
          </Link>

          <Link
            to="/dashboard/manageUsers"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Manage Users</div>
          </Link>

          <Link
            to="/dashboard/manageContent"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Manage Content</div>
          </Link>
          <Link
            to="/dashboard/manageTenders"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Manage Tenders</div>
          </Link>
          <Link
            to="/dashboard/manageContractors"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Manage Contractors</div>
          </Link>
          <Link
            to="/dashboard/manageImportantNotices"
            style={{ textDecoration: "none" }}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Important Notices</div>
          </Link>
          <a
            href="https://console.firebase.google.com/u/0/project/rsmw-56be8/storage/rsmw-56be8.appspot.com/files/~2Fgallery"
            style={{ textDecoration: "none" }}
            rel="noreferrer"
            target="_blank"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div>Manage Gallery</div>
          </a>
        </section>
      </div>
      <div className={styles.main}>
        <Switch>
          <Route path="/dashboard" component={Ledger} exact />
          <Route path="/dashboard/complaints" component={Complaints} exact />
          <Route path="/dashboard/adduser" component={AddUsers} exact />
          <Route path="/dashboard/addevent" component={AddEvent} exact />
          <Route
            path="/dashboard/addTransaction"
            component={AddTransaction}
            exact
          />
          <Route
            path="/dashboard/addNotification"
            component={AddNotification}
            exact
          />
          <Route path="/dashboard/noticeBoard" component={NoticeBoard} exact />
          <Route path="/dashboard/events" component={Events} exact />
          <Route path="/dashboard/manageUsers" component={ManageUsers} exact />
          <Route
            path="/dashboard/manageContent"
            component={ManageContent}
            exact
          />
          <Route
            path="/dashboard/manageTenders"
            component={ManageTenders}
            exact
          />
          <Route
            path="/dashboard/manageContractors"
            component={ManageContractors}
            exact
          />
          <Route
            path="/dashboard/manageImportantNotices"
            component={ManageImportantNotices}
            exact
          />
          <Route
            path="/dashboard/addImportantNotices"
            component={AddImportantNotice}
            exact
          />
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;

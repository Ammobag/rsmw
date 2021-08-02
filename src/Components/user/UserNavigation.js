import { React, useState } from "react";
import "./UserNavigation.css";
import { Switch, Link } from "react-router-dom";
import ErrorBoundary from "../functions/ErrorBoundary";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "@material-ui/core/Avatar";

export default function UserNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
          <ArrowBackIcon
            className="closebtn"
            onClick={() => setIsNavOpen(false)}
            style={{ cursor: "pointer", color: "#ffffff" }}
          />

          <Link to="/feed" style={{ textDecoration: "none" }}>
            <div>Feed</div>
          </Link>

          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <div>Transactions</div>
          </Link>

          <Link to="/noticeBoard" style={{ textDecoration: "none" }}>
            <div>Notice Board</div>
          </Link>

          <Link to="/complaints" style={{ textDecoration: "none" }}>
            <div>Complaints</div>
          </Link>

          <Link to="/classifiedSection" style={{ textDecoration: "none" }}>
            <div>Classified Section</div>
          </Link>
        </div>

        <div className="navbar">
          <div className="navbarContent">
            <div className="hamburger">
              <MenuIcon
                onClick={() => setIsNavOpen(true)}
                style={{
                  color: "#ffffff",
                }}
              />
            </div>
            <div className="avatar">
              <Avatar
                alt="pic"
                src="https://randomuser.me/api/portraits/med/men/58.jpg"
              />
            </div>
          </div>
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

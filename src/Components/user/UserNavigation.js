import { React, useState } from "react";
import "./UserDashBoard.css";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import ErrorBoundary from "../functions/ErrorBoundary";

export default function UserNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const history = useHistory();
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

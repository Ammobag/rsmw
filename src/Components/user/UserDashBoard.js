import { React, useState } from "react";
import "./UserDashBoard.css";
import { Route, Switch, Link } from "react-router-dom";
import UserFeed from "./UserFeed";
import UserTransactions from "./UserTransactions";
import UserNoticeBoard from "./UserNoticeBoard";
import UserComplaints from "./UserComplaints";
import UserClassifiedSection from "./UserClassifiedSection";
export default function UserDashBoard() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const openNav = {
    width: "300px",
  };
  const closeNav = {
    width: "0px",
  };

  console.log(isNavOpen);
  return (
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

        <Link to="/userDashBoard" style={{ textDecoration: "none" }}>
          <div>Feed</div>
        </Link>

        <Link
          to="/userDashBoard/transactions"
          style={{ textDecoration: "none" }}
        >
          <div>Transactions</div>
        </Link>

        <Link
          to="/userDashBoard/noticeBoard"
          style={{ textDecoration: "none" }}
        >
          <div>Notice Board</div>
        </Link>

        <Link to="/userDashBoard/complaints" style={{ textDecoration: "none" }}>
          <div>Complaints</div>
        </Link>

        <Link
          to="/userDashBoard/classifiedSection"
          style={{ textDecoration: "none" }}
        >
          <div>Classified Section</div>
        </Link>
      </div>

      <button type="button" onClick={() => setIsNavOpen(true)}>
        Open
      </button>
      <div>
        <Switch>
          <Route path="/userDashBoard" component={UserFeed} exact />
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
          />
        </Switch>
      </div>
    </div>
  );
}

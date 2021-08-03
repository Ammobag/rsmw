import { React, useState } from "react";
import "./UserNavigation.css";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "@material-ui/core/Avatar";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";

export default function UserNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();


  const handleAddPost = (e) => {
    history.replace("/addPost");
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;

      if (uid !== undefined) {

      } else {
        history.replace("/");
      }
    } else {
      history.replace("/");
    }
  });
  const openNav = {
    width: "480px",
  };
  const closeNav = {
    width: "0px",
  };

  return (
    <div>
      <div className="sidenav" style={isNavOpen ? openNav : closeNav}>
        <ArrowBackIcon
          className="closebtn"
          onClick={() => setIsNavOpen(false)}
          style={{ cursor: "pointer", color: "#ffffff" }}
        />
        <section>
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
        </section>
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
          <div className="navbar-right">
            {location.pathname === "/feed" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPost}
              >
                Add Post
              </Button>
            )}
            <div className="avatar">
              <Avatar
                alt="pic"
                src="https://randomuser.me/api/portraits/med/men/58.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { React, useState, useRef, useEffect } from "react";
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
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import logout from "../functions/logout";

export default function UserNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
    width: "400px",
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
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              />
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>My Profile</MenuItem>
                          <MenuItem onClick={() => logout()}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

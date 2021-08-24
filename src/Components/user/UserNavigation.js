import { React, useState, useRef, useEffect } from "react";
import styles from "./UserNavigation.module.css";
import { useHistory } from "react-router-dom";
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
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();

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

  const handleViewProfile = (e) => {
    history.replace("/userProfile");
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;

      if (uid !== "6cryi8fnJySKAUBgfq6gPN49Gax1") {
      } else {
        logout();
        history.replace("/");
      }
    } else {
      logout();
      history.replace("/");
    }
  });

  const openNav = {
    width: "400px",
  };
  const closeNav = {
    width: "0px",
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var database = firebase.database();
      var Ref = database.ref("users/" + user.uid + "/");
      Ref.once("value", (snapshot) => {
        var query = snapshot.val();
        setUser(query);
      });
    }
  });

  return (
    <div>
      <div className={styles.sidenav} style={isNavOpen ? openNav : closeNav}>
        <ArrowBackIcon
          className={styles.closebtn}
          onClick={() => setIsNavOpen(false)}
          style={{ cursor: "pointer", color: "#ffffff" }}
        />
        <section>
          <Link to="/feed" style={{ textDecoration: "none" }}>
            <div>Resident's post</div>
          </Link>

          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <div>Monthly Maintenance</div>
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

      <div className={styles.navbar}>
        <div className={styles.navbarContent}>
          <div className={styles.hamburger}>
            <MenuIcon
              onClick={() => setIsNavOpen(true)}
              style={{
                color: "#ffffff",
              }}
            />
          </div>
          <div className={styles.navbarRight}>
            <div className={styles.avatar}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ margin: 8, color: "#ffffff" }}>
                  {user ? user.name : ""}
                </div>
                <Avatar
                  alt="pic"
                  src={
                    user
                      ? user.image
                      : "https://firebasestorage.googleapis.com/v0/b/rsmw-56be8.appspot.com/o/asset%2Fuser.png?alt=media&token=888aa232-bf02-4e35-bd50-d3ba76237c44"
                  }
                  style={{ objectFit: "cover" }}
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                />
              </div>
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
                          <MenuItem onClick={handleViewProfile}>
                            My Profile
                          </MenuItem>
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

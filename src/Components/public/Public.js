import React, { useState } from "react";
import styles from "./Public.module.css";
import logo from "../../Assets/logo.png";
import Home from "./Home";
import Gallery from "./Gallery";
import ContactUs from "./ContactUs";
import Tenders from "./Tenders";
import AboutUs from "./AboutUs";
import Contractors from "./Contractors";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function Public() {
  const [activeTab, setActiveTab] = useState("Home");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className={styles.topnav}>
        <div className={styles.brand}>
          <img src={logo} alt="Logo" />
          <div>IV-AoA</div>
          <div className={styles.desktop}>
            ( Ideal Villas Apartment Owners Association )
          </div>
        </div>

        <nav className={styles.navbar}>
          <menu onClick={() => setActiveTab("Home")}>Home</menu>
          <menu onClick={() => setActiveTab("Gallery")}>Gallery</menu>
          <menu onClick={() => setActiveTab("Contact")}>Contact</menu>
          <menu onClick={() => setActiveTab("About")}>About</menu>
          <menu onClick={() => setActiveTab("Tenders")}>Tenders</menu>
          <menu onClick={() => setActiveTab("Contractors")}>Contractors</menu>
        </nav>
        <div className={styles.hamburger}>
          <MenuIcon
            style={{
              color: "#000000",
            }}
            onClick={handleClick}
          />
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              setActiveTab("Home");
              handleClose();
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveTab("Gallery");
              handleClose();
            }}
          >
            Gallery
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveTab("Contact");
              handleClose();
            }}
          >
            Contact
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveTab("About");
              handleClose();
            }}
          >
            About
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveTab("Tenders");
              handleClose();
            }}
          >
            Tenders
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveTab("Contractors");
              handleClose();
            }}
          >
            Contractors
          </MenuItem>
        </Menu>
      </div>
      {activeTab === "Home" && <Home />}
      {activeTab === "Gallery" && <Gallery />}
      {activeTab === "Contact" && <ContactUs />}
      {activeTab === "Tenders" && <Tenders />}
      {activeTab === "About" && <AboutUs />}
      {activeTab === "Contractors" && <Contractors />}
      <footer>
        <div className={styles.footerWrapper}>
          <div className={styles.footer1}>
            <img src={logo} alt="Logo" />
            <p>Ideal Villas Owner's Association</p>
          </div>
          <div className={styles.footer2}>
            <div>Terms and Conditions</div>
            <div>Privacy Policy</div>
          </div>
          <div className={styles.footer3}>
            <h4>Facility Manager - John Doe</h4>
            <br />
            <p>Contact At - 9807000000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

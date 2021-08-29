import React, { useState } from "react";
import styles from "./Public.module.css";
import logo from "../../Assets/logo.png";
import Home from "./Home";
import Gallery from "./Gallery";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";

export default function Public() {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <div>
      <div className={styles.topnav}>
        <div className={styles.brand}>
          <img src={logo} alt="Logo"/>
          <div>Ideal Villas Owner's Association</div>
        </div>

        <nav>
          <menu onClick={() => setActiveTab("Home")}>Home</menu>
          <menu onClick={() => setActiveTab("Gallery")}>Gallery</menu>
          <menu onClick={() => setActiveTab("Contact")}>Contact</menu>
          <menu onClick={() => setActiveTab("About")}>About</menu>
        </nav>
      </div>
      {activeTab === "Home" && <Home />}
      {activeTab === "Gallery" && <Gallery />}
      {activeTab === "Contact" && <ContactUs />}
      {activeTab === "About" && <AboutUs />}
      <footer>
        <p>Ideal Villas Owner's Association</p>
      </footer>
    </div>
  );
}

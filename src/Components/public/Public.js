import React, { useState } from "react";
import styles from "./Public.module.css";
import logo from "../../Assets/logo.png";
import Home from "./Home";
import Gallery from "./Gallery";
import ContactUs from "./ContactUs";
import Tenders from "./Tenders";
import AboutUs from "./AboutUs";
import Contractors from "./Contractors";

export default function Public() {

  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div>
      <div className={styles.topnav}>
        <div className={styles.brand}>
          <img src={logo} alt="Logo" />
          <div>IV-AoA</div>
        </div>

        <nav>
          <menu onClick={() => setActiveTab("Home")}>Home</menu>
          <menu onClick={() => setActiveTab("Gallery")}>Gallery</menu>
          <menu onClick={() => setActiveTab("Contact")}>Contact</menu>
          <menu onClick={() => setActiveTab("About")}>About</menu>
          <menu onClick={() => setActiveTab("Tenders")}>Tenders</menu>
          <menu onClick={() => setActiveTab("Contractors")}>Contractors</menu>
        </nav>
      </div>
      {activeTab === "Home" && <Home />}
      {activeTab === "Gallery" && <Gallery />}
      {activeTab === "Contact" && <ContactUs />}
      {activeTab === "Tenders" && <Tenders />}
      {activeTab === "About" && <AboutUs />}
      {activeTab === "Contractors" && <Contractors />}
      <footer>
        <p>Ideal Villas Owner's Association</p>
        <div>
          <p className={styles.TandC}>Terms And Conditions</p>
          <p>|</p>
          <p className={styles.TandC}>Privacy Policy</p>
        </div>
      </footer>
    </div>
  );
}

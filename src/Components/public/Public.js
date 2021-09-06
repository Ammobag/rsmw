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
        <div className={styles.footerWrapper}>
          <div className={styles.footer1}>
            <img src={logo} alt="Logo" />
            <p>Ideal Villas Owner's Association</p>
          </div>
          <div className={styles.vl}></div>
          <div className={styles.footer2}>
            <div>Terms and Conditions</div>
            <div>Privacy Policy</div>
          </div>
          <div className={styles.vl}></div>
          <div className={styles.footer3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>Facility Manager - John Doe</h2>
              <br />
              <p>Contact At - 9807000000</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

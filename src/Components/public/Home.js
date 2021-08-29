import React, { useState } from "react";
import slider1 from "../../Assets/slider1.jpeg";
import slider2 from "../../Assets/slider2.jpeg";
import slider3 from "../../Assets/slider3.jpeg";
import slider4 from "../../Assets/slider4.jpeg";
import styles from "./Home.module.css";
export default function Home() {
  // eslint-disable-next-line
  const [activeMenu, setActiveMenu] = useState("Home");
  // eslint-disable-next-line
  const active = {
    backgroundColor: "#ffffff",
    color: "#ffffff",
  };
  // eslint-disable-next-line
  const inActive = {};
  const [index, setIndex] = React.useState(0);
  const delay = 4000;
  React.useEffect(() => {
    setTimeout(
      () => setIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1)),
      delay
    );
    return () => {};
  }, [index]);
  return (
    <div>
      <section>
        <div className={styles.slideshow}>
          <div
            className={styles.slideshowSlider}
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            <img src={slider1} className={styles.slide} alt=""/>
            <img src={slider2} className={styles.slide} alt=""/>
            <img src={slider3} className={styles.slide} alt=""/>
            <img src={slider4} className={styles.slide} alt=""/>
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageWrapper}>
            <img src={slider3} alt="" />
          </div>
          <ul className={styles.menubar}>
            <li id="nav1">
              
              <a className="clearfix1" href="/createAccount">
                <span className="content1">Consumer Registration</span>
              </a>
            </li>
            <li>
              <a className="clearfix1" href="/logIn">
                <span className="content1">Consumer Login</span>
              </a>
            </li>
            <li>
              <a className="clearfix1" href="https://www.google.com/">
                <span className="content1">Expense Sheet</span>
              </a>
            </li>
            <li>
              <a className="clearfix1"  href="/transactions">
                <span className="content1">Pay Online</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

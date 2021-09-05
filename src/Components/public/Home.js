import React, { useState } from "react";
import slider1 from "../../Assets/slider1.jpeg";
import slider2 from "../../Assets/slider2.jpeg";
import slider3 from "../../Assets/slider3.jpeg";
import slider4 from "../../Assets/slider4.jpeg";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";
import sizeObject from "../functions/dataHandling";

export default function Home() {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  var query = Getonce("importantNotices/");
  const [importantNotices, setImportantNotices] = useState([]);
  var list = [];
  if (!fetch) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];
        console.log(element);

        list.push(element);
      }
      console.log(list.length, sizeObject(query));
      if (list.length === sizeObject(query)) {
        setData(list);
        setFetch(true);
      }
    }
  }
  // eslint-disable-next-line
  const [index, setIndex] = React.useState(0);
  const delay = 4000;
  React.useEffect(() => {
    setTimeout(
      () => setIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1)),
      delay
    );
    return () => {};
  }, [index]);
  const ImportantNotices = () => {
    console.log(data);
    return (
      <div>
        <li>
          <h4 className="content1">Important Notices</h4>
        </li>
        {data.map((item) => (
          <li>
            <span className="content1">{item.body}</span>
          </li>
        ))}
      </div>
    );
  };
  return (
    <div>
      <section>
        <div className={styles.slideshow}>
          <div
            className={styles.slideshowSlider}
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            <img src={slider1} className={styles.slide} alt="" />
            <img src={slider2} className={styles.slide} alt="" />
            <img src={slider3} className={styles.slide} alt="" />
            <img src={slider4} className={styles.slide} alt="" />
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.contentWrapper}>
          <ul className={styles.menubar}>
            <ImportantNotices />
          </ul>
          <ul className={styles.menubar}>
            <li id="nav1">
              <Link to="/createAccount">
                <span className="content1">Consumer Registration</span>
              </Link>
            </li>
            <li>
              <Link to="/logIn">
                <span className="content1">Consumer Login</span>
              </Link>
            </li>
            <li>
              <a className="clearfix1" href="https://www.google.com/">
                <span className="content1">Expense Sheet</span>
              </a>
            </li>
            <li>
              <Link to="/transactions">
                <span className="content1">Pay Online</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

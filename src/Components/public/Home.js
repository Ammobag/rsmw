import React, { useState } from "react";
import slider1 from "../../Assets/slider1.jpeg";
import slider2 from "../../Assets/slider2.jpeg";
import slider3 from "../../Assets/slider3.jpeg";
import slider4 from "../../Assets/slider4.jpeg";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";

import Getonce from "../functions/dbquery";
import sizeObject from "../functions/dataHandling";

export default function Home() {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [check, setCheck] = useState(false);
  const [images, setimages] = useState([]);

  const history = useHistory();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  });

  var query = Getonce("importantNotices/");
  var list = [];
  if (!fetch) {
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];

        list.push(element);
      }
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
    return (
      <div>
        {data.map((item) => (
          <li>
            <span className="content1">{item.body}</span>
          </li>
        ))}
      </div>
    );
  };

  const fetchAsync = async () => {
    let list = [];
    var storageRef = await firebase.storage().ref("sliders/").listAll();

    for (let i = 0; i < storageRef.items.length; i++) {
      const element = storageRef.items[i];
      var link = await element.getDownloadURL();
      list.push(link);
    }

    if (list.length > 0) {
      setimages(list);
    }
  };

  const Gallery = () => {
    if (images.length > 0) {
      return images.map((value, index) => {
        return (
          <img alt="img" key={index} src={value} className={styles.slide} />
        );
      });
    } else {
      fetchAsync();
      return (
        <>
          <img alt="img" src={slider1} className={styles.slide} />
          <img alt="img" src={slider2} className={styles.slide} />
          <img alt="img" src={slider3} className={styles.slide} />
          <img alt="img" src={slider4} className={styles.slide} />
        </>
      );
    }
  };

  return (
    <div>
      <section>
        <div className={styles.slideshow}>
          <div
            className={styles.slideshowSlider}
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            <Gallery />
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.contentWrapper}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="content1">Important Notices</h2>
            <br />

            <ul className={styles.impnotice}>
              <ImportantNotices />
            </ul>
          </div>
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
              <Link
                onClick={() => {
                  if (check) {
                    history.replace("/transactions");
                  } else {
                    alert("Please Log in to continue");
                  }
                }}
              >
                <span className="content1">Pay Online</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

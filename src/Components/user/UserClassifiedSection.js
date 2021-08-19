import React, { useState } from "react";
import UserNavigation from "./UserNavigation";
import styles from "./UserClassifiedSection.module.css";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";

const database = firebase.database();

export default function UserClassifiedSection() {
  const history = useHistory();
  var query = Getonce("classified/");
  var data = [];

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const element = query[key];

      data.push(element);
    }
  }

  const handleAddPost = (e) => {
    history.push("/addClassified");
  };

  const UserName = ({ uid }) => {
    const [user, setUser] = useState(null);
    if (!user) {
      var Ref = database.ref("users/" + uid + "/");
      Ref.once("value", (snapshot) => {
        var users = snapshot.val();
        setUser(users);
      });
    }

    if (user) {
      return <div>{user.name}</div>;
    } else {
      return <div>Loading...</div>;
    }
  };

  const DisplayImage = ({ url }) => {
    var links = url.split("|||");
    console.log(links);
    return links.map((link, index) => (
      <span key={index}>
        <img alt="img" src={link} className={styles.img} />
      </span>
    ));
  };

  function formatDate(timestamp) {
    var dateNow = new Date(timestamp);
    var date = `${dateNow.toLocaleString("en", {
      day: "2-digit",
    })} ${dateNow.toLocaleString("en", {
      month: "short",
    })} at ${dateNow.toLocaleString("ru", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`;
    return date;    
  }

  console.log(data);

  const NoticeBoard = data.map((value, index) => (
    <div className={styles.notice} key={index}>
      <div className={styles.info}>
        <div className={styles.issuer}>
          <UserName uid={value.UID} />
          <div className={styles.issuerDesignation}>{formatDate(value.timestamp)}</div>
        </div>
      </div>
      <div className={styles.message}>{value.caption}</div>
      {value.phoneNumber && (
        <div className={styles.contact}>Phone : {value.phoneNumber}</div>
      )}
      {value.email && (
        <div className={styles.contact}>Email : {value.email}</div>
      )}
      {value.address && (
        <div className={styles.contact}>Address : {value.address}</div>
      )}
      <div style={{ marginBottom: "20px" }}></div>
      <DisplayImage url={value.images} />
    </div>
  ));

  return (
    <div>
      <UserNavigation />
      <button type="button" onClick={handleAddPost} className="addPostBtn">
        +
      </button>
      <div className={styles.feedPage}>{NoticeBoard}</div>
    </div>
  );
}

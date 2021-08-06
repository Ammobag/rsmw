import React from "react";
import UserNavigation from "./UserNavigation";
import styles from "./UserNoticeBoard.module.css";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";

export default function UserNoticeBoard() {
  var query = Getonce("notices/");
  var data = [];

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      const element = query[key];

      data.push(element);
    }
  }

  const NoticeBoard = data.map((value) => (
    <div className={styles.notice}>
      <div className={styles.info}>
        <div className={styles.issuer}>
          <div>{value.issuerName}</div>
          <div className={styles.issuerDesignation}>
            {value.issuerDesignation}
          </div>
        </div>
        <div className={styles.date}>{value.date}</div>
      </div>
      <div className={styles.subject}>{value.subject}</div>
      <div className={styles.message}>{value.body}</div>
    </div>
  ));

  return (
    <div>
      <UserNavigation />
      <div className={styles.feedPage}>{NoticeBoard}</div>
    </div>
  );
}

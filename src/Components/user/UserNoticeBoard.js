import React, { useState } from "react";
import UserNavigation from "./UserNavigation";
import styles from "./UserNoticeBoard.module.css";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";

export default function UserNoticeBoard() {
  const [activeTab, setActiveTab] = useState("Notices");
  var noticeQuery = Getonce("notices/");
  var eventQuery = Getonce("events/");
  var noticeData = [];
  var eventData = [];
  const active = {
    backgroundColor: "#F7776A",
    color: "#ffffff",
    padding: 2,
    borderRadius: 3,
  };
  for (const key in noticeQuery) {
    if (Object.hasOwnProperty.call(noticeQuery, key)) {
      const element = noticeQuery[key];

      noticeData.push(element);
    }
  }
  for (const key in eventQuery) {
    if (Object.hasOwnProperty.call(eventQuery, key)) {
      const element = eventQuery[key];

      eventData.push(element);
    }
  }
  const Notices = noticeData.map((value, index) => (
    <div className={styles.notice} key={index}>
      <div className={styles.info}>
        <div className={styles.issuer}>
          <div>{value.issuerName}</div>
          <div className={styles.issuerDesignation}>
            {value.issuerDesignation}
          </div>
        </div>
        <div className={styles.date}>{value.date}</div>
      </div>
      <div className={styles.subject}>
        {value.subject}
        <div></div>
      </div>
      <div className={styles.message}>{value.body}</div>
    </div>
  ));
  const Events = eventData.map((value, index) => (
    <div className={styles.event} key={index}>
      <div className={styles.eventName}>{value.name}</div>
      <div className={styles.eventBody}>{value.body}</div>
      <img src={value.image} alt="img" />
    </div>
  ));

  return (
    <div>
      <UserNavigation />
      <div className={styles.feedPage}>
        <div style={{ height: 30 }} />
        <div className={styles.tab}>
          <div
            onClick={() => setActiveTab("Notices")}
            style={activeTab === "Notices" ? active : null}
          >
            Notices
          </div>
          <div>|</div>
          <div
            onClick={() => setActiveTab("Events")}
            style={activeTab === "Events" ? active : null}
          >
            Events
          </div>
        </div>
        {activeTab === "Notices" ? Notices : Events}
      </div>
    </div>
  );
}

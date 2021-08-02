import React from "react";
import UserNavigation from "./UserNavigation"
import "./style.css";
import "./UserNoticeBoard.css";

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

      var insert = {
        col1: element.issuerName,
        col2: element.issuerDesignation,
        col3: element.subject,
        col4: element.body,
        col5: element.date,
      };

      data.push(element);
    }
  }

  const NoticeBoard = data.map((value) =>
    <div className="notice">
      <div className="info">
        <div className="issuer">
          <div className="issuername">{value.issuerName}</div>
          <div className="issuerDesignation">{value.issuerDesignation}</div>
        </div>
        <div className="date">{value.date}</div>
      </div>
      <div className="subject">{value.subject}</div>  
      <div className="message">
        {value.body}
      </div>
    </div>
  );

  return( 
    <div className="main-body"> 
      <UserNavigation/>
      <div className="feed-page">
        {NoticeBoard}
      </div>
    </div>
  );
}
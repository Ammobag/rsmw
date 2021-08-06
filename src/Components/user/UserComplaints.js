import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import UserNavigation from "./UserNavigation";
import { useHistory } from "react-router-dom";
import styles from "./UserComplaints.module.css";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";

export default function UserComplaints() {
  const [token, settoken] = useState("");
  const [error, seterror] = useState(null);
  const [complaint, setcomplaint] = useState(null);
  const history = useHistory();

  const handleNewComplaints = (e) => {
    history.replace("/addComplaint");
  };

  const handleSubmit = (e) => {
    if (token) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          var reference = "complaints/" + token;
          var database = firebase.database();
          var Ref = database.ref(reference);
          Ref.once("value", (snapshot) => {
            var query = snapshot.val();

            if (query != null) {
              console.log(query.UID, uid);
              if (query.UID === uid) {
                setcomplaint(query);
              } else {
                seterror("This Complaint Token is not owned by You.");
              }
            } else {
              setcomplaint(null);
              seterror("No Complaint Found.");
            }
          });
        }
        console.log(complaint);
      });
    }
  };

  return (
    <div>
      <UserNavigation />
      <div className={styles.feedPage}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewComplaints}
          style={{ margin: "1rem" }}
        >
          Lodge new Complaint
        </Button>
        <br />
        <br />
        <div>
          <h2 style={{ textAlign: "center", margin: "1rem" }}>
            Check Complaint Status
          </h2>
          <TextField
            id="token"
            label="Complaint Token"
            type="text"
            variant="outlined"
            margin="dense"
            style={{ margin: 8 }}
            value={token}
            onChange={(e) => settoken(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ margin: 8 }}
          >
            Check Status
          </Button>
        </div>
        <br />
        <div style={{ color: "red" }}>{error}</div>
        <br />
        {complaint != null && (
          <div className={styles.complaint}>
            <div className={styles.info}>
              <div className={styles.issuer}>
                <div className={styles.subject}>{complaint.subject}</div>
                <Status status={complaint.status} />
              </div>
              <div className={styles.date}>
                {complaint.dateOpened} to {complaint.dateClosed}
              </div>
            </div>

            <div className="message">{complaint.body}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Status({ status }) {
  if (status === "open") {
    return <span className={`${styles.status} ${styles.green}`}>Open</span>;
  } else if (status === "processing") {
    return (
      <span className={`${styles.status} ${styles.yellow}`}>Processing</span>
    );
  } else if (status === "closed") {
    return <span className={`${styles.status} ${styles.red}`}>Closed</span>;
  }
}

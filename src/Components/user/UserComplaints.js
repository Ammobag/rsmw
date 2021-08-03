import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import UserNavigation from "./UserNavigation";
import { useHistory } from "react-router-dom";
import "./style.css";
import "./UserComplaints.css";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import Getonce from "../functions/dbquery";

export default function UserComplaints() {
  const [token, settoken] = useState("");
  const [uid, setuid] = useState(null);
  const [error, seterror] = useState(null);
  const [complaint, setcomplaint] = useState(null);
  const history = useHistory();

  const handleNewComplaints = (e) => {
    history.replace("/feed");
  }

  const handleSubmit = (e) => {
    if (token) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          setuid(uid)
        }
      });
      var reference = "complaints/"+token;
      var database = firebase.database();
      var Ref = database.ref(reference);
        Ref.once('value', (snapshot) => {
            var query = snapshot.val();
            if(query != null ){
              if(query.UID === uid){
                setcomplaint(query)
              }else{
                seterror("This Complaint Token is not owned by You.")
              }
            }else{
              setcomplaint(null)
              seterror("No Complaint Found.")
            }
        })
      
    }
    console.log(complaint)
  };
  return( 
    <div className="main-body"> 
      <UserNavigation/>
      <div className="feed-page">
        <Button variant="contained" color="primary" onClick={handleNewComplaints}>
          Lodge new Complaint
        </Button>

      <br/><br/>
        <div className="statusSection">
          <h2>Check Complaint Status</h2>
          <TextField
              id="token"
              label="Complaint Token"
              type="text"
              variant="outlined"
              margin="dense"
              style={{ margin: 8 }}
              value={token}
              onChange={(e) => settoken(e.target.value)}
          /><br/>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
              Check Status
            </Button>
        </div> 
        <br/>
        <div style={{ color: "red" }}>{error}</div>
        <br/>
        {complaint != null &&
          <div className="complaint">
           
              <div className="info">
                <div className="issuer">
                  <div className="subject">{complaint.subject}</div> 
                  <Status status={complaint.status} />              
                </div>
                <div className="date">{complaint.dateOpened} to {complaint.dateClosed}</div>  
              </div>
               
              <div className="message">
                {complaint.body}
              </div>
            
          </div>
        }
      </div>
    </div>
  );
}

function Status({status}) {
  if(status == "open"){
    return(
      <span class="status green">Open</span>
    );
  }else if (status == "processing"){
    return(
      <span class="status yellow">Processing</span>
    )
  }else if (status == "closed"){
    return(
      <span class="status red">Closed</span>
    )
  }
}
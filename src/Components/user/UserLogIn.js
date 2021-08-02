import { React, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";


export default function UserLogIn() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const history = useHistory();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log("User Check : ");
      if (uid !== undefined) {
        console.log(uid);
        history.replace("/feed");
      } 
    } 
  });

  const handleSubmit = (e) => {
    if (password && userName) {
      var user;
      firebase.auth().signInWithEmailAndPassword(userName, password)
      .then((userCredential) => {
        user = userCredential.user;
        console.log(user)
        history.push("/feed");
      })
      .catch((error) => {
        var errorMessage = error.message;
        seterror(errorMessage);
      });
    } else {
      seterror("Please enter a valid username and password");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="body">
      <div className="login-wrapper">
        <div style={{ color: "red" }}>{error}</div>
        <div className="textField-wrapper">
          <div>
            <TextField
              id="username"
              label="Username"
              type="text"
              variant="outlined"
              margin="dense"
              style={{ margin: 8 }}
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              style={{ margin: 8 }}
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Log In
            </Button>
          
        </div>
      </div>
    </div>
  );
}

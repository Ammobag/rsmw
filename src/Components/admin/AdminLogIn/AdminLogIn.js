import { React, useState } from "react";
import "./AdminLogIn.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import firebase from "firebase/app";
import "firebase/database";
import {} from "../../firebase";

var database = firebase.database();

var Ref = database.ref('admin/');
Ref.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});


export default function UserLogIn() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    if (password && userName) {
      console.log(userName);
      console.log(password);
      console.log("Hello!");
    } else {
      alert("Please enter a valid username and password");
    }
    setUsername("");
    setPassword("");
  };
  return (
    <body>
      <div className="login-wrapper">
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
        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </div>
    </body>
  );
}

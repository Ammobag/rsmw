import { React, useState } from "react";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";
import { writeUserData } from "../../functions/dbquery";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });


export default function AddUsers() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [flatno, setFlatno] = useState("");
  const [blockno, setBlockno] = useState("");
  const [name, setName] = useState("");
  const [error, seterror] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    if (password && userName && flatno && blockno && name) {
      
      firebase.auth().createUserWithEmailAndPassword(userName, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            writeUserData(user.uid, name, userName, phonenumber, flatno, blockno);
            history.push("/dashboard/manageUsers");
            setUsername("");
            setPassword("");
            setphonenumber("");
            setName("");
            setFlatno("");
            setBlockno("");
            seterror("");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            seterror(errorMessage);
        });
    } else {
      seterror("Please enter a valid username and password");
    }

  };

  return (
    <div className="body">
      <div className="login-wrapper">
        <div style={{ color: "red" }}>{error}</div>
        <div className="textField-wrapper">
          <div>
            <TextField
              id="username"
              label="Email"
              type="email"
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
            <TextField
              id="name"
              label="Name"
              type="text"
              variant="outlined"
              margin="dense"
              style={{ margin: 8 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="phonenumber"
              label="Phone Number"
              type="text"
              variant="outlined"
              margin="dense"
              style={{ margin: 8 }}
              value={phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="Flatno"
              label="Flat Number"
              type="text"
              variant="outlined"
              style={{ margin: 8 }}
              margin="dense"
              value={flatno}
              onChange={(e) => setFlatno(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="Blockno"
              label="Block Number"
              type="text"
              variant="outlined"
              style={{ margin: 8 }}
              margin="dense"
              value={blockno}
              onChange={(e) => setBlockno(e.target.value)}
            />
          </div>
        </div>

        <div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add New User
            </Button>
          
        </div>
      </div>
    </div>
  );
}

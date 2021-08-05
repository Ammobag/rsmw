import { React, useState } from "react";
import "./AdminLogIn.css";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function UserLogIn() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    if (password && userName) {
      var user;
      firebase
        .auth()
        .signInWithEmailAndPassword(userName, password)
        .then((userCredential) => {
          user = userCredential.user;
          if (user.uid === "6cryi8fnJySKAUBgfq6gPN49Gax1") {
            history.push("/dashboard");
          }
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
      <div style={{ color: "red" }}>{error}</div>
      <div className="adminLoginBody">
        <div className="adminLogin-wrapper">
          <div style={{ color: "red" }}>{error}</div>
          <div className="loginTextField-wrapper">
            <div>
              <input
                placeholder="Username"
                type="email"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="inputField"
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputField"
              />
            </div>
          </div>
          <div>
            <button
              className="loginButton"
              style={{
                width: 250,
                height: 70,
                backgroundColor: "rgba(33, 150, 243, 1)",
                borderRadius: 25,
                border: "none",
                color: "white",
                fontSize: "1.5rem",
              }}
              onClick={handleSubmit}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

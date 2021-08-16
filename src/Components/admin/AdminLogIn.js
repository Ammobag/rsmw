import { React, useState } from "react";
import styles from "./AdminLogIn.module.css";
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
    <div className={styles.body}>
      <div className={styles.adminLogInBody}>
        <div className={styles.wrapper}>
          <div style={{ color: "red" }}>{error}</div>
          <div>
            <div>
              <input
                placeholder="Username"
                type="email"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
              />
            </div>
          </div>
          <div>
            <button className={styles.loginButton} onClick={handleSubmit}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import loginImage from "../../Assets/loginImage2.jpg";
import logo from "../../Assets/logo.png";
import styles from "./UserLogIn.module.css";

export default function UserLogIn() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log("User Check : ");
      if (uid !== undefined) {
        console.log(uid);
        history.replace("/feed");
      } else {
        console.log("User Logged Out");
      }
    }
    setLoading(false);
  });

  const handleSubmit = (e) => {
    if (password && userName) {
      var user;
      firebase
        .auth()
        .signInWithEmailAndPassword(userName, password)
        .then((userCredential) => {
          user = userCredential.user;
          console.log(user);
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.donut}></div>
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <section className={styles.loginImage}>
          <img src={loginImage} alt="Login goes here" />
        </section>
        <section className={styles.loginSection}>
          <div className={styles.wrapper}>
            <div style={{ color: "red" }}>{error}</div>
            <h1>Ideal Villas</h1>
            <div style={{ height: 30 }} />
            <input
              placeholder="Username"
              type="email"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
            />
            <div style={{ height: 30 }} />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
            <div>
              <div style={{ height: 30 }} />
              <button className={styles.loginButton} onClick={handleSubmit}>
                Log In
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

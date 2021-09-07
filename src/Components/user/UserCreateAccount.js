import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import loginImage from "../../Assets/loginImage2.jpg";
import logo from "../../Assets/logo.png";
import styles from "./UserLogIn.module.css";

export default function UserCreateAccount() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    if (password && userName) {

      firebase
        .auth()
        .createUserWithEmailAndPassword(userName, password)
        .then((userCredential) => {
          history.push("/basicForm");
        })
        .catch((error) => {
          var errorMessage = error.message;
          seterror(errorMessage);
        });
    } else {
      seterror("Please enter a valid email and password");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.main}>
      <section className={styles.loginImage}>
        <img src={loginImage} alt="Login goes here" />
      </section>
      <section className={styles.loginSection}>
        <div className={styles.wrapper}>
          <div style={{ color: "red" }}>{error}</div>
          <img src={logo} alt="Logo" />
          <h1>Ideal Villas</h1>
          <div style={{ height: 30 }} />
          <input
            placeholder="Email"
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ height: 30 }} />
            <button className={styles.loginButton} onClick={handleSubmit}>
              Create Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

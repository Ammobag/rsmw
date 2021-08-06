import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import loginImage from "../../Assets/loginImage.jpg";
import styles from "./UserLogIn.module.css";

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

  return (
    <div className={styles.main}>
      <section className={styles.loginImage}>
        <img src={loginImage} alt="Login goes here" />
      </section>
      <section className={styles.loginSection}>
        <div className={styles.userLoginBody}>
          <div className={styles.wrapper}>
            <div style={{ color: "red" }}>{error}</div>
            <div className={styles.textFieldWrapper}>
              <h1>John Doe Apartment</h1>
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
            <p className={styles.forgotPassword}>
              Forgot password? <span>Click here.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import { React, useState } from "react";
import { useHistory, Link} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import loginImage from "../../Assets/loginImage2.jpg";
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
      seterror("Please enter a valid email and password");
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
            <h1>Ideal Villas Owner's Association</h1>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ height: 30 }} />
              <button className={styles.loginButton} onClick={handleSubmit}>
                Log In
              </button>
              <div style={{ height: 100 }} />
              <Link
                to="/forgotpassword"
                style={{ textDecoration: "none" }}
              >
                <div>Forgot Password ?</div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

import { React, useState } from "react";
import { useHistory} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import loginImage from "../../Assets/loginImage2.jpg";
import styles from "./UserLogIn.module.css";

export default function ForgotPassword() {
  const [email, setemail] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    if (email) {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Reset Password Email has been Sent. ")
        history.replace("/")
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
      });
    } else {
      alert("Please enter a valid email and password");
    }
    setemail("");
  };


    return (
      <div className={styles.main}>
        <section className={styles.loginImage}>
          <img src={loginImage} alt="Login goes here" />
        </section>
        <section className={styles.loginSection}>
          <div className={styles.wrapper}>
            <h1>Ideal Villas Owner's Association</h1>
            <div style={{ height: 30 }} />
            <input
              placeholder="Your Email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className={styles.inputField}
            />
            <div style={{ height: 30 }} />
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ height: 30 }} />
              <button className={styles.loginButton} onClick={handleSubmit}>
                Send Reset Password Email
              </button>

             
            </div>
          </div>
        </section>
      </div>
    );
}

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import loginImage from "../../Assets/loginImage.jpg";
import "./UserLogIn.css";

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
    <div className="master">
      <section className="loginImage">
        <img src={loginImage} alt="Login goes here" />
      </section>
      <section className="loginSection">
        <div className="userLoginBody">
          <div className="userLogin-wrapper">
            <div style={{ color: "red" }}>{error}</div>
            <div className="loginTextField-wrapper">
              <h1>John Doe Apartment</h1>
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
            <p className="forgotPassword">
              Forgot password? <span>Click here.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

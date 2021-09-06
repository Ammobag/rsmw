import { React, useState } from "react";
import styles from "./AddEvent.module.css";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import TextField from "@material-ui/core/TextField";
// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddExpense() {
  const [link, setlink] = useState("");
  const [status, setstatus] = useState(0);
  const [error, seterror] = useState("");
  const [current, setCurrent] = useState("")


  var database = firebase.database();

  database.ref("/").child("expense").once("value", (snapshot) => {
    var query = snapshot.val();
    setCurrent(query)
  });


  const handleSubmit = (e) => {
    if (link) {
      setstatus(1);
      database.ref("/").child("expense").set(link)
      setlink("")
      setstatus(2)
      setTimeout(() => {
        window.location.reload(true)
      }, 2000);
    } else {
      seterror("Enter all the fields");
    }
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <h2>Update Expense Sheet</h2>
          {error && (
            <div>
              <h3 style={{ color: "red" }}>{error}</h3>
            </div>
          )}

          <a href={current} style={{ textDecoration: "none" }}>
            <div>Current Sheet</div>
          </a>

          {status === 0 && (
            <section>
              <TextField
                id="link"
                label="Google Sheets Link"
                type="text"
                variant="outlined"
                margin="dense"
                style={{ width: 300, marginBottom: 30 }}
                value={link}
                onChange={(e) => setlink(e.target.value)}
              />
              <div style={{ height: 30 }} />

              <div className={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Update
                </Button>
              </div>
            </section>
          )}

          {status === 1 && (
            <div style={{ padding: 50 }}>
              <div>Uploading ...</div>
            </div>
          )}

          {status === 2 && (
            <div>
              <h3 style={{ color: "green" }}>Updated Successfully</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

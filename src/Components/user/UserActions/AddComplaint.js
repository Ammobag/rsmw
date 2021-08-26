import { React, useState } from "react";
import styles from "./AddComplaint.module.css";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../../firebase";
import { postComplaint } from "../../functions/dbquery";
import UserNavigation from "../UserNavigation";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddComplaint() {
  const [subject, setsubject] = useState("");
  const [status, setstatus] = useState(0);
  const [otherSubjectSpec, setOtherSubjectSpec] = useState("");
  const [body, setbody] = useState("");
  const [token, settoken] = useState(null);
  // eslint-disable-next-line
  const [error, seterror] = useState("");

  const handleSubmit = (e) => {
    if (subject && body) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          var timestamp = Date.now();
          console.log(uid, subject, body, timestamp);
          postComplaint(uid, subject, body, timestamp);
          settoken(timestamp);
          setstatus(1);
        }
      });
    }
  };
  const handleSubjectChange = (event) => {
    setsubject(event.target.value);
  };
  return (
    <div>
      <UserNavigation />
      <div className={styles.main}>
        <div>
          <h2 style={{ textAlign: "center" }}>Create a Complaint</h2>
          {error && (
            <div>
              <h3 style={{ color: "red" }}>{error}</h3>
            </div>
          )}
          {status === 0 && (
            <section className={styles.wrapper}>
              <FormControl
                styles={{
                  minWidth: 120,
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subject}
                  displayEmpty
                  onChange={handleSubjectChange}
                  autoWidth={true}
                >
                  <MenuItem value="" disabled>
                    Subject
                  </MenuItem>
                  <MenuItem value={"Electrical"}>Electrical</MenuItem>
                  <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                  <MenuItem value={"Security Agency"}>Security Agency</MenuItem>
                  <MenuItem value={"Garderner"}>Gardener </MenuItem>
                  <MenuItem value={"House Keeping"}>House Keeping</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              {subject === "Other" ? (
                <form noValidate autoComplete="off">
                  <TextField
                    id="standard-basic"
                    label="Please specify"
                    value={otherSubjectSpec}
                    onChange={(e) => setOtherSubjectSpec(e.target.value)}
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                  />
                </form>
              ) : (
                <div />
              )}
              <form>
                <textarea
                  placeholder="Write about your complaint here ..."
                  onChange={(e) => setbody(e.target.value)}
                  value={body}
                  style={{ width: 400 }}
                ></textarea>
              </form>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Lodge Complaint
                </Button>
              </div>
            </section>
          )}

          {status === 1 && (
            <div>
              <h3 style={{ color: "green", textAlign: "center" }}>
                Complaint Lodged Successfully
              </h3>
              <h4 style={{ textAlign: "center" }}>
                Your Complaint Token is : <strong>{token}</strong>
              </h4>
              <p style={{ textAlign: "center" }}>
                Use this token to check status of your Complaint
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

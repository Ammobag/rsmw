import { React, useState } from "react";
import styles from "./AddNotification.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";
import { postNotification } from "../../functions/dbquery";
import Select from "react-dropdown-select";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddNotification() {
  const [issuer, setissuer] = useState("");
  const [designation, setdesignation] = useState();
  const [subject, setsubject] = useState("");
  const [body, setbody] = useState("");
  const [error, seterror] = useState("");
  const history = useHistory();

  const designations = [{ name: "Owner" }, { name: "Secretary" }];

  const handleSubmit = (e) => {
    if (issuer && designation && subject && body) {
      postNotification(issuer, designation[0].name, subject, body);
      history.replace("/dashboard/noticeBoard");
    } else {
      seterror("Please enter all the fields");
    }
  };

  return (
    <div className={styles.main}>
      <div style={{ color: "red" }}>{error}</div>
      <div className={styles.wrapper}>
        <TextField
          id="issuer"
          label="Issuer Name"
          type="text"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={issuer}
          onChange={(e) => setissuer(e.target.value)}
        />
        <Select
          style={{ width: 300 }}
          placeholder="Select Designation"
          color={"#000"}
          labelField={"name"}
          valueField={"name"}
          options={designations}
          dropdownGap={5}
          onChange={(values) => setdesignation(values)}
          noDataLabel="No matches found"
        />
        <TextField
          id="subject"
          label="Subject"
          type="text"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={subject}
          onChange={(e) => setsubject(e.target.value)}
        />
        <br />
        <form>
          <textarea
            placeholder="Add a Notice Body..."
            value={body}
            onChange={(e) => setbody(e.target.value)}
          ></textarea>
        </form>
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Notice
        </Button>
      </div>
    </div>
  );
}

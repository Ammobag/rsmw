import { React, useState } from "react";
import styles from "./AddTender.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";
import { addTender } from "../../functions/dbquery";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddTender() {
  const [name, setName] = useState();
  const [openingDate, setOpeningDate] = useState();
  const [closingDate, setClosingDate] = useState();
  const [amount, setAmount] = useState();
  const [details, setDetails] = useState();

  const [error, seterror] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    if (name && openingDate && closingDate && amount && details) {
      addTender(name, openingDate, closingDate, amount, details);
      history.replace("/dashboard/manageTenders");
    } else {
      seterror("Please enter all the fields");
    }
  };

  return (
    <div className={styles.main}>
      <div style={{ color: "red" }}>{error}</div>
      <div className={styles.wrapper}>
        <TextField
          id="tenderName"
          label="Tender Name"
          type="text"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="openingDate"
          label="Opening Date"
          type="text"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={openingDate}
          onChange={(e) => setOpeningDate(e.target.value)}
        />
        <TextField
          id="closingDate"
          label="Closing Date"
          type="text"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
        />

        <TextField
          id="amount"
          label="Amount"
          type="number"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <form>
          <textarea
            placeholder="Add Tender Details..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </form>
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Tender
        </Button>
      </div>
    </div>
  );
}

import { React, useState } from "react";
import styles from "./AddNotification.module.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import "firebase/database";
import "firebase/auth";
import {} from "../../firebase";
import { postImpNotification } from "../../functions/dbquery";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddImportantNotice() {
  const [body, setbody] = useState("");
  const [error, seterror] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    if (body) {
      postImpNotification(body);
      history.replace("/dashboard/manageImportantNotices");
    } else {
      seterror("Please enter all the fields");
    }
  };

  return (
    <div className={styles.main}>
      <div style={{ color: "red" }}>{error}</div>
      <div className={styles.wrapper}>
        <form>
          <textarea
            placeholder="Add Important Notice Body..."
            value={body}
            onChange={(e) => setbody(e.target.value)}
          ></textarea>
        </form>
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Important Notice
        </Button>
      </div>
    </div>
  );
}

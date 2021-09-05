import { React, useState } from "react";
import styles from "./ApplyTender.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import logo from "../../Assets/logo.png";
// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function ApplyTender() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState();
  const [error, seterror] = useState("");
  const history = useHistory();
  function handleFiles(e) {
    console.log("in handle image");
    console.log(e.target.files);
    setFiles(e.target.files);
  }

  const handleSubmit = (e) => {};

  const DisplayFiles = () => {
    var _files = [];
    for (let i = 0; i < files.length; i++) {
      _files.push(files[i]);
    }

    return _files.map((value, index) => (
      <div style={{ display: "flex", flexDirection: "column" }} key={index}>
        <div style={{ height: 30 }} />
        <p>{value.name}</p>
      </div>
    ));
  };
  return (
    <div className={styles.main}>
      <div style={{ color: "red" }}>{error}</div>
      <div className={styles.wrapper}>
        <img src={logo} alt="logo" />
        <TextField
          id="name"
          label="Name"
          type="text"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="contact"
          label="Contact No."
          type="tel"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          style={{ width: 300 }}
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <form>
          <textarea
            placeholder="Add a Description.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </form>
        <div className={styles.imageSelection}>
          <p>Attach File (Pdf):</p>

          <label htmlFor="myfile">
            <FileCopyIcon />
          </label>

          <input
            type="file"
            id="myfile"
            name="myfile"
            accept="application/pdf, application/vnd.ms-excel"
            onChange={handleFiles}
            multiple
          />
          <br />
          {files && <DisplayFiles />}
        </div>
      </div>
      <div style={{ height: 30 }} />
      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Apply
        </Button>
      </div>
    </div>
  );
}

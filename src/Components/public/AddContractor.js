import { React, useState } from "react";
import styles from "./AddClassified.module.css";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import { uploadContactor } from "../functions/dbquery";
import { TextField } from "@material-ui/core";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddContractor() {
  const [category, setcategory] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setstatus] = useState(0);
  const [error, seterror] = useState("");
  const [name, setname] = useState("");

  const handleImage = (e) => {
    console.log("in handle image");
    console.log(e.target.files);
    setImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    if (image) {
      setstatus(1);
      const timestamp = Date.now();
      for (let i = 0; i < image.length; i++) {
        const element = image[i];

        var storageRef = firebase.storage().ref();
        var filename = element.name;
        // eslint-disable-next-line
        var uploadTask = await storageRef
          .child("contractor/" + timestamp + "/" + filename)
          .put(element);
      }

      uploadContactor(timestamp, name, phone, email, category, description);
      setstatus(2);
    } else {
      seterror("Enter all the fields");
    }
  };

  const DisplayFiles = () => {
    if (image) {
      let arr = [];
      console.log("Print", image.length);
      for (let i = 0; i < image.length; i++) {
        const element = image[i];
        console.log(element.name);
        arr.push(element);
      }
      return arr.map((value, index) => {
        return <div key={index}>{value.name}</div>;
      });
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div style={{ height: 30 }} />
          <h3>Register as a Contractor</h3>
          <div style={{ height: 30 }} />
          {error && (
            <div>
              <h3 style={{ color: "red" }}>{error}</h3>
            </div>
          )}
          {status === 0 && (
            <section>
              <form style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  value={name}
                  fullWidth
                  onChange={(e) => setname(e.target.value)}
                />
                <div style={{ height: 30 }} />

                <TextField
                  id="phoneNo"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  margin="dense"
                  value={phone}
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div style={{ height: 30 }} />

                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="dense"
                  value={email}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ height: 30 }} />

                <TextField
                  id="category"
                  label="Category"
                  type="category"
                  variant="outlined"
                  margin="dense"
                  value={category}
                  fullWidth
                  onChange={(e) => setcategory(e.target.value)}
                />
                <div style={{ height: 30 }} />

                <TextField
                  id="description"
                  label="Description"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  value={description}
                  fullWidth
                  onChange={(e) => setdescription(e.target.value)}
                />
                <div style={{ height: 30 }} />
              </form>
              <div style={{ height: 30 }} />
              <div className={styles.imageSelection}>
                <p>Add Documents:</p>

                <label for="myfile">
                  <ImageIcon />
                </label>

                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  accept=".pdf"
                  onChange={handleImage}
                  multiple
                />
              </div>
              <DisplayFiles />

              <div style={{ height: 30 }} />
              <div className={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Register
                </Button>
              </div>
              <div style={{ height: 30 }} />
            </section>
          )}

          {status === 1 && (
            <div style={{ padding: 50 }}>
              <div>Uploading Files ...</div>
            </div>
          )}

          {status === 2 && (
            <div>
              <h3 style={{ color: "green" }}>Registered Successfully</h3>
              <h5 style={{ color: "green" }}>Wait for Admin's Approval</h5>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: 30 }} />
    </div>
  );
}

import { React, useState } from "react";
import styles from "./AddClassified.module.css";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../../firebase";
import { uploadClassified } from "../../functions/dbquery";
import { useHistory } from "react-router-dom";
import UserNavigation from "../UserNavigation";
// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddClassified() {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [status, setstatus] = useState(0);
  const [error, seterror] = useState("");

  const history = useHistory();

  const handleImage = (e) => {
    console.log("in handle image");
    console.log(e.target.files);
    setImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    if (image && message) {
      setstatus(1);

      let imageLinks = "";
      for (let i = 0; i < image.length; i++) {
        const element = image[i];
        var timestamp = Date.now();
        var storageRef = firebase.storage().ref();
        var filename = timestamp + element.name;
        // eslint-disable-next-line
        var uploadTask = await storageRef
          .child("classified/" + filename)
          .put(element);

        var uploadLink = await storageRef
          .child("classified/" + filename)
          .getDownloadURL();

        imageLinks = imageLinks.concat(uploadLink);

        if (i !== image.length - 1) {
          imageLinks = imageLinks.concat("|||");
        }
      }

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("File available at", imageLinks);
          var uid = user.uid;
          uploadClassified(uid, message, imageLinks, phone, email, address);
          setstatus(2);
          setTimeout(() => {
            history.replace("/classifiedSection");
          }, 2000);
        }
      });
    } else {
      seterror("Enter all the fields");
    }
  };

  const DisplayImage = ({ image }) => {
    var img = [];
    for (let i = 0; i < image.length; i++) {
      img.push(image[i]);
    }

    return img.map((value, index) => (
      <>
        <div style={{ height: 30 }} />
        <img
          src={URL.createObjectURL(value)}
          style={{ width: 400, margin: 10 }}
          key={index}
          alt={"pic"}
        />
      </>
    ));
  };

  return (
    <div>
      <UserNavigation />
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <h2>Create a post</h2>
          {error && (
            <div>
              <h3 style={{ color: "red" }}>{error}</h3>
            </div>
          )}
          {status === 0 && (
            <section>
              <form style={{ display: "flex", flexDirection: "column" }}>
                <textarea
                  placeholder="Write here ..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
                <div style={{ height: 30 }} />
                <p>Contact Info</p>
                <div style={{ height: 30 }} />
                <input
                  placeholder="Phone Number"
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <div style={{ height: 30 }} />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <div style={{ height: 30 }} />
                <input
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                <div style={{ height: 30 }} />
              </form>
              <div style={{ height: 30 }} />
              <div className={styles.imageSelection}>
                <p>Add Images:</p>

                <label for="myfile">
                  <ImageIcon />
                </label>

                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  accept=".jpg, .png, .jpeg, .jfif, .gif, .bmp, .tif, .tiff|image/*"
                  onChange={handleImage}
                  multiple
                />
              </div>
              {image && (
                <DisplayImage image={image} />

                // image.map((value, index) =>(
                //   <img src={URL.createObjectURL(value)} style={{ width: 400 }} key={index} alt={"pic"} />
                // ))
              )}
              <div style={{ height: 30 }} />
              <div className={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Upload Post
                </Button>
              </div>
            </section>
          )}

          {status === 1 && (
            <div style={{ padding: 50 }}>
              <div>Uploading Files ...</div>
            </div>
          )}

          {status === 2 && (
            <div>
              <h3 style={{ color: "green" }}>Uploaded Successfully</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { React, useState } from "react";
import styles from "./AddPost.module.css";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../../firebase";
import { uploadPost } from "../../functions/dbquery";
import { useHistory } from "react-router-dom";
import UserNavigation from "../UserNavigation";
// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddPost() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [displayImage, setdisplayImage] = useState(null);
  const [status, setstatus] = useState(0);
  const [progress, setprogress] = useState(0);
  const [error, seterror] = useState("");

  const history = useHistory();

  const handleImage = (e) => {
    console.log("in handle image");
    setdisplayImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    if (image && message) {
      setstatus(1);
      console.log(image);
      var timestamp = Date.now();
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child("images/" + timestamp + image.name)
        .put(image);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setprogress(progress);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                console.log("File available at", downloadURL);
                var uid = user.uid;
                uploadPost(uid, message, downloadURL);
                setstatus(2);
                setTimeout(() => {
                  history.replace("/feed");
                }, 2000);
              } else {
                // User is signed out
                // ...
              }
            });
          });
        }
      );
    } else {
      seterror("Enter all the fields");
    }
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
              <form>
                <textarea
                  placeholder="What's on your mind?"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
              </form>
              <div style={{ height: 30 }} />
              <div className={styles.imageSelection}>
                <p>Add a Image:</p>
                <label className={styles.filebutton}>
                  <ImageIcon fontSize="large" />
                  <span>
                    <input
                      type="file"
                      id="myfile"
                      name="myfile"
                      accept=".jpg, .png, .jpeg, .jfif, .gif, .bmp, .tif, .tiff|image/*"
                      onChange={handleImage}
                    />
                  </span>
                </label>
              </div>
              <div style={{ height: 30 }} />
              {displayImage && (
                <img src={displayImage} style={{ width: 400 }} alt={"pic"} />
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
              <div className={styles.progress}>
                <div className={styles.bar} style={{ width: progress + "%" }}>
                  <p className={styles.percent}>{progress}%</p>
                </div>
              </div>
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

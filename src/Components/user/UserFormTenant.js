import { React, useState } from "react";
import styles from "./UserFormTenant.module.css";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import logo from "../../Assets/logo.png";
import FileCopyIcon from "@material-ui/icons/FileCopy";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function UserFormTenant() {
  const [detail, setDetails] = useState({});
  const [idproof, setidproof] = useState(null);
  const [image, setImage] = useState(null);
  const [status, setstatus] = useState(0);
  const [progress, setprogress] = useState(0);
  const [error, seterror] = useState("");
  const [user, setuser] = useState();

  const history = useHistory();

  firebase.auth().onAuthStateChanged((users) => {
    if (users) {
      setuser(users);
    }
  });

  console.log(user);

  const handleDeed = (e) => {
    console.log("in handle Deed");
    setImage(e.target.files[0]);
  };

  const handleIdProof = (e) => {
    console.log("in handle ID");
    setidproof(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    if (image && idproof && user) {
      setstatus(1);
      console.log(user);
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child("documents/" + user.uid + "/tenant/" + image.name)
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
            uploadTask = storageRef
              .child("documents/" + user.uid + "/tenant/" + idproof.name)
              .put(idproof);

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
                      var uid = user.uid;
                      firebase
                        .database()
                        .ref("users/" + uid + "/tenantForm/")
                        .set(detail);
                      setstatus(2);
                      setTimeout(() => {
                        history.replace("/servantForm");
                      }, 2000);
                    }
                  });
                });
              }
            );
          });
        }
      );
    } else {
      seterror("Enter all the fields");
    }
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <img src={logo} alt="logo" />
          <h2>Tenant Details Form</h2>
          {error && (
            <div>
              <h3 style={{ color: "red" }}>{error}</h3>
            </div>
          )}
          {status === 0 && (
            <section>
              <TextField
                id="name"
                label="Name"
                type="text"
                variant="outlined"
                margin="dense"
                style={{ width: 300, marginBottom: 30 }}
                value={detail.name}
                onChange={(e) =>
                  setDetails({ ...detail, name: e.target.value })
                }
              />
              <TextField
                id="email"
                label="Email"
                type="text"
                variant="outlined"
                margin="dense"
                style={{ width: 300, marginBottom: 30 }}
                value={detail.email}
                onChange={(e) =>
                  setDetails({ ...detail, email: e.target.value })
                }
              />
              <TextField
                id="phone"
                label="Phone Number"
                type="text"
                variant="outlined"
                margin="dense"
                style={{ width: 300, marginBottom: 30 }}
                value={detail.phone}
                onChange={(e) =>
                  setDetails({ ...detail, phone: e.target.value })
                }
              />
              <TextField
                label="Number of Residents Staying ?"
                type="text"
                variant="outlined"
                margin="dense"
                style={{ width: 300, marginBottom: 30 }}
                value={detail.residents}
                onChange={(e) =>
                  setDetails({ ...detail, residents: e.target.value })
                }
              />
              <form>
                <textarea
                  placeholder="Details of Residents staying in House (Eg: Name : Phone Number,)"
                  onChange={(e) =>
                    setDetails({ ...detail, resdetails: e.target.value })
                  }
                  value={detail.resdetails}
                  style={{ width: 300, marginBottom: 30 }}
                ></textarea>
              </form>

              <div style={{ height: 30 }} />
              <div className={styles.imageSelection}>
                <p>Add Police Verification:</p>

                <label for="myfile">
                  <FileCopyIcon />
                </label>

                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  accept=".pdf"
                  onChange={handleDeed}
                />
              </div>

              {image && <div>{image.name}</div>}

              <div className={styles.imageSelection}>
                <p>Add Rental Agreement:</p>

                <label for="myfile2">
                  <FileCopyIcon />
                </label>

                <input
                  type="file"
                  id="myfile2"
                  name="myfile2"
                  accept=".pdf"
                  onChange={handleIdProof}
                />
              </div>

              {idproof && <div>{idproof.name}</div>}
              <div style={{ height: 30 }} />
              <div style={{ height: 30 }} />
              <div className={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Next
                </Button>
              </div>
              <div style={{ height: 30 }} />
              <div className={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.replace("/servantForm");
                  }}
                  disableElevation
                >
                  Skip
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

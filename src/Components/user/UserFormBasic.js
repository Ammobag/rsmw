import { React, useState } from "react";
import styles from "./UserFormBasic.module.css";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import logo from "../../Assets/logo.png";
import FileCopyIcon from "@material-ui/icons/FileCopy";

export default function UserFormBasic() {
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
        .child("documents/" + user.uid + "/" + image.name)
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
              .child("documents/" + user.uid + "/" + idproof.name)
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
                        .ref("users/" + uid + "/basicForm/")
                        .set(detail);
                      firebase
                        .database()
                        .ref("users/" + uid + "/")
                        .child("name")
                        .set(detail.name);
                      firebase
                        .database()
                        .ref("users/" + uid + "/")
                        .child("email")
                        .set(detail.email);
                      firebase
                        .database()
                        .ref("users/" + uid + "/")
                        .child("phonenumber")
                        .set(detail.phone);
                      firebase
                        .database()
                        .ref("users/" + uid + "/")
                        .child("UID")
                        .set(uid);
                      firebase
                        .database()
                        .ref("users/" + uid + "/")
                        .child("image")
                        .set(
                          "https://firebasestorage.googleapis.com/v0/b/rsmw-56be8.appspot.com/o/asset%2Fuser.png?alt=media&token=888aa232-bf02-4e35-bd50-d3ba76237c44"
                        );
                      firebase
                        .database()
                        .ref("users/" + uid + "/")
                        .child("permanentRes")
                        .set(detail.residents);
                      firebase
                        .database()
                        .ref("users/" + uid + "/")
                        .child("villaType")
                        .set(detail.type);
                      firebase
                        .database()
                        .ref("users/" + uid + "/visitors/")
                        .child("length")
                        .set(0);
                      firebase
                        .database()
                        .ref("users/" + uid + "/vehicle/")
                        .child("length")
                        .set(0);
                      setstatus(2);
                      setTimeout(() => {
                        history.replace("/tenantForm");
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
          <h2>Basic Details Form</h2>
          <div style={{ height: 30 }} />
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
                type="email"
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
                type="tel"
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
                type="number"
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
                  placeholder="Details of Residents staying in House"
                  onChange={(e) =>
                    setDetails({ ...detail, resdetails: e.target.value })
                  }
                  value={detail.resdetails}
                  style={{ width: 300, marginBottom: 30 }}
                ></textarea>
              </form>

              <FormControl
                styles={{
                  minWidth: 120,
                }}
              >
                Villa Type :
                <Select
                  style={{ minWidth: 300 }}
                  value={detail.type}
                  displayEmpty
                  onChange={(e) =>
                    setDetails({ ...detail, type: e.target.value })
                  }
                  autoWidth={true}
                  placeholder={"Select Villa Type"}
                >
                  <MenuItem value="" disabled selected>
                    Select Villa Type
                  </MenuItem>
                  <MenuItem value={"Miranda"}>Miranda</MenuItem>
                  <MenuItem value={"Leon"}>Leon</MenuItem>
                  <MenuItem value={"Pedro"}>Pedro</MenuItem>
                </Select>
              </FormControl>
              <div style={{ height: 30 }} />
              <div className={styles.imageSelection}>
                <p>Add Deed:</p>

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
                <p>Add Id Proof:</p>

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
                  Continue
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

import { React, useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import styles from "./UserFormServant.module.css";
import TextField from "@material-ui/core/TextField";
import { deleteVisitorData } from "../functions/dbquery";
import { useHistory } from "react-router-dom";
import logo from "../../Assets/logo.png";

export default function UserFormServant() {
  const [image, setImage] = useState("");
  const [idproof, setidproof] = useState(null);
  const [status, setstatus] = useState(0);
  const [progress, setprogress] = useState(0);
  const [user, setuser] = useState(null);
  const [newVisitorName, setNewVisitorName] = useState("");
  const [newVisitorPurpose, setNewVisitorPurpose] = useState("");
  const [newVisitorContact, setNewVisitorContact] = useState("");
  const [workingHours, setworkingHours] = useState("")
  const [visitors, setvisitors] = useState();
  // eslint-disable-next-line
  const [error, seterror] = useState("");
  const history = useHistory();

  var database = firebase.database();

  if (!user) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var Ref = database.ref("users/" + user.uid + "/");
        Ref.once("value", (snapshot) => {
          var users = snapshot.val();
          setuser(user);
          setvisitors(users.visitors);
        });
      }
    });
  }

  const handleDeed = (e) => {
    setImage(e.target.files[0]);
  };

  const handleIdProof = (e) => {
    setidproof(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    if (
      image &&
      idproof &&
      user &&
      newVisitorContact &&
      newVisitorName &&
      newVisitorPurpose
    ) {
      setstatus(1);
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child(
          "documents/" +
            user.uid +
            "/worker/" +
            visitors.length +
            "/" +
            image.name
        )
        .put(image);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progress);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              break;
            default:
          }
        },
        (error) => {
          alert(error.message);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            uploadTask = storageRef
              .child(
                "documents/" +
                  user.uid +
                  "/worker/" +
                  visitors.length +
                  "/" +
                  idproof.name
              )
              .put(idproof);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
              firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setprogress(progress);
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    break;
                  default:
                }
              },
              (error) => {
                alert(error.message);
              },
              () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      firebase
                        .database()
                        .ref(
                          "users/" + user.uid + "/visitors/" + visitors.length
                        )
                        .set({
                          name: newVisitorName,
                          contact: newVisitorContact,
                          purpose: newVisitorPurpose,
                          hours : workingHours
                        });
                      firebase
                        .database()
                        .ref("users/" + user.uid + "/visitors/")
                        .child("length")
                        .set(visitors.length + 1);
                      setstatus(0);
                      var Ref = database.ref("users/" + user.uid + "/");
                      Ref.once("value", (snapshot) => {
                        var users = snapshot.val();
                        setvisitors(users.visitors);
                      });
                    }
                  });
                });
              }
            );
          });
        }
      );
    }
  };

  const handleNext = (e) => {
    history.replace("/vehicleForm");
  };

  const handleDeleteVisitor = (index) => {
    deleteVisitorData(user.UID, index);
  };

  const ViewVisitor = (e) => {
    if (visitors) {
      let arr = [];
      let keys = [];
      for (let i = 0; i < visitors.length; i++) {
        const element = visitors[i];
        if (!element.deleted) {
          arr.push(element);
          keys.push(i);
        }
      }

      return (
        <>
          <h4>Visitors:</h4>
          {arr.map((visitor, index) => {
            return (
              <>
                <div className={styles.gridContainer} key={index}>
                  <div className={styles.gridItem}>Name:</div>
                  <div className={styles.gridItem}>{visitor.name}</div>
                  <div className={styles.gridItem}>Purpose:</div>
                  <div className={styles.gridItem}>{visitor.purpose}</div>
                  <div className={styles.gridItem}>Contact:</div>
                  <div className={styles.gridItem}>{visitor.contact}</div>
                  <div className={styles.gridItem}>Working Hours:</div>
                  <div className={styles.gridItem}>{visitor.hours}</div>
                  
                </div>
                <button onClick={(e) => handleDeleteVisitor(keys[index])}>
                    Delete
                  </button>
                </>
            );
          })}
        </>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <img src={logo} alt="logo" />
          <h2>Servant/Workers Details Form</h2>
          {error && (
            <div>
              <h3 style={{ color: "red" }}>{error}</h3>
            </div>
          )}
          {status === 0 && (
            <section>
              {user && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <ViewVisitor />
                  <>
                   <div style={{ height: 30 }} />
                    <div style={{ height: 30 }} />
                    <h4> Add New Visitor</h4>
                    <div >
                      <div >
                        <TextField
                          label="Name"
                          type="text"
                          variant="outlined"
                          margin="dense"
                          style={{ width: 300, marginBottom: 30 }}
                          value={newVisitorName}
                          onChange={(e) => setNewVisitorName(e.target.value)}
                        />
                      </div>
                      <div >
                        <TextField
                          label="Purpose"
                          type="text"
                          variant="outlined"
                          margin="dense"
                          style={{ width: 300, marginBottom: 30 }}
                          value={newVisitorPurpose}
                          onChange={(e) => setNewVisitorPurpose(e.target.value)}
                        />
                      </div>
                      <div >
                        <TextField
                          label="Contact"
                          type="tel"
                          variant="outlined"
                          margin="dense"
                          style={{ width: 300, marginBottom: 30 }}
                          value={newVisitorContact}
                          onChange={(e) => setNewVisitorContact(e.target.value)}
                        />
                      </div>
                      <div >
                        <TextField
                          label="Working Hours"
                          type="tel"
                          variant="outlined"
                          margin="dense"
                          style={{ width: 300, marginBottom: 30 }}
                          value={workingHours}
                          onChange={(e) => setworkingHours(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ height: 30 }} />
                    <div className={styles.imageSelection}>
                      <p>Add Police Verification:</p>

                      <label for="myfile">
                        <ImageIcon />
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
                        <ImageIcon />
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
                  </>
                  <div style={{ height: 30 }} />

                  <div style={{ height: 30 }} />
                </div>
              )}
              <div className="buttonWrapper">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Add
                </Button>
                <div style={{ height: 30 }} />
              </div>
              <div className="buttonWrapper">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disableElevation
                >
                  Next
                </Button>
                <div style={{ height: 30 }} />
              </div>
            </section>
          )}

          {status === 1 && (
            <div style={{ padding: 50 }}>
              <div>Uploading Files ...</div>
              <div className="progress">
                <div className="bar" style={{ width: progress + "%" }}>
                  <p className="percent">{progress}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

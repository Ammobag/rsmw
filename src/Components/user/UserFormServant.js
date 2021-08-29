import { React, useState } from "react";
import "./UserActions/AddPost.module.css";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import styles from "./UserProfile.module.css";
import TextField from "@material-ui/core/TextField";
import { deleteVisitorData } from "../functions/dbquery";
import { useHistory } from "react-router-dom";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function UserFormServant() {
  const [image, setImage] = useState("");
  const [idproof, setidproof] = useState(null);
  const [status, setstatus] = useState(0);
  const [progress, setprogress] = useState(0);
  const [user, setuser] = useState(null);
  const [newVisitorName, setNewVisitorName] = useState("");
  const [newVisitorPurpose, setNewVisitorPurpose] = useState("");
  const [newVisitorContact, setNewVisitorContact] = useState("");
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
    console.log("in handle Deed");
    setImage(e.target.files[0]);

  };

  const handleIdProof = (e) => {
    console.log("in handle ID");
    setidproof(e.target.files[0]);
  };


  const handleSubmit = (e) => {

    if (image && idproof && user && newVisitorContact && newVisitorName && newVisitorPurpose) {
      setstatus(1);
      console.log(user);
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child("documents/"+ user.uid + "/worker/" + visitors.length+ "/" + image.name)
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
          alert(error.message);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
           
             uploadTask = storageRef
              .child("documents/"+ user.uid + "/worker/" + visitors.length+ "/" + idproof.name)
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
                 alert(error.message);
                
              },
              () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                 
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      firebase
                      .database()
                      .ref("users/" + user.uid + "/visitors/" + visitors.length)
                      .set({
                        name: newVisitorName,
                        contact: newVisitorContact,
                        purpose: newVisitorPurpose,
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
    history.replace("/vehicleForm")
  };

  const handleDeleteVisitor = (index) => {
    console.log(index);
    deleteVisitorData(user.UID, index);
  };

  const ViewVisitor = (e) => {
    console.log(visitors);
    if (visitors) {
      let arr = [];
      let keys = [];
      for (let i = 0; i < visitors.length; i++) {
        const element = visitors[i];
        console.log(element);
        if (!element.deleted) {
          arr.push(element);
          keys.push(i);
        }
      }

      console.log(arr, keys);

      return (
        <>
          <h4>Visitors:</h4>
          {arr.map((visitor, index) => {
            return (
              <div className={styles.gridContainer} key={index}>
                <div className={styles.gridItem}>Name:</div>
                <div className={styles.gridItem}>{visitor.name}</div>
                <div className={styles.gridItem}>Purpose:</div>
                <div className={styles.gridItem}>{visitor.purpose}</div>
                <div className={styles.gridItem}>Contact:</div>
                <div className={styles.gridItem}>{visitor.contact}</div>
                <button onClick={(e) => handleDeleteVisitor(keys[index])}>
                  Delete
                </button>
              </div>
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
          <div style={{ height: 30 }} />
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
                  <div style={{ height: 30 }} />
                   <ViewVisitor />
                  <>
                    <h4> Add New Visitor</h4>
                    <div className={styles.gridContainer}>
                      <div className={styles.gridItem}>Name:</div>
                      <div className={styles.gridItem}>
                        <TextField
                          type="text"
                          variant="outlined"
                          margin="dense"
                          style={{ width: 200 }}
                          value={newVisitorName}
                          onChange={(e) => setNewVisitorName(e.target.value)}
                        />
                      </div>
                      <div className={styles.gridItem}>Purpose:</div>
                      <div className={styles.gridItem}>
                        <TextField
                          type="text"
                          variant="outlined"
                          margin="dense"
                          style={{ width: 200 }}
                          value={newVisitorPurpose}
                          onChange={(e) => setNewVisitorPurpose(e.target.value)}
                        />
                      </div>
                      <div className={styles.gridItem}>Contact:</div>
                      <div className={styles.gridItem}>
                        <TextField
                          type="tel"
                          variant="outlined"
                          margin="dense"
                          style={{ width: 200 }}
                          value={newVisitorContact}
                          onChange={(e) => setNewVisitorContact(e.target.value)}
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

                    {image &&
                      <div>{image.name}</div>
                    }

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

                    {idproof &&
                      <div>{idproof.name}</div>
                    }
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

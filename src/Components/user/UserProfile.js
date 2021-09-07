import { React, useState } from "react";
import "./AddPost.module.css";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import { useHistory } from "react-router-dom";
import UserNavigation from "./UserNavigation";
import styles from "./UserProfile.module.css";
import TextField from "@material-ui/core/TextField";
import { deleteVisitorData } from "../functions/dbquery";



export default function UserProfile() {
  const [image, setImage] = useState("");
  const [displayImage, setdisplayImage] = useState("");
  const [status, setstatus] = useState(0);
  const [progress, setprogress] = useState(0);
  const [user, setuser] = useState(null);
  const [phonenumber, setphonenumber] = useState();
  const [permanentRes, setpermanentRes] = useState();
  const [visitors, setvisitors] = useState();
  const [vehicle, setvehicle] = useState()
  // eslint-disable-next-line
  const [error, seterror] = useState("");

  var database = firebase.database();
  const history = useHistory();

  if (!user) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var Ref = database.ref("users/" + user.uid + "/");
        Ref.once("value", (snapshot) => {
          var users = snapshot.val();
          setuser(users);
          setphonenumber(users.phonenumber);
          setdisplayImage(users.image);
          setpermanentRes(users.permanentRes);
          setvisitors(users.visitors);
          setvehicle(users.vehicle);
        });
      }
    });
  }

  const handleImage = (e) => {
    setdisplayImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  function uploadImage(e) {
    var storageRef = firebase.storage().ref();
    var split = image.name.split(".");
    var uploadTask = storageRef
      .child("profile/" + user.UID + "." + split[split.length - 1])
      .put(image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

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
          if (user) {

            var uid = user.UID;
            firebase
              .database()
              .ref("users/" + uid + "/")
              .child("image")
              .set(downloadURL);

            setstatus(0);
          } else {
            // User is signed out
            // ...
          }
        });
      }
    );
  }

  const handleSubmit = (e) => {
    if (image) {
      setstatus(1);

      uploadImage();
    }
    firebase
      .database()
      .ref("users/" + user.UID + "/")
      .child("phonenumber")
      .set(phonenumber);
    firebase
      .database()
      .ref("users/" + user.UID + "/")
      .child("permanentRes")
      .set(permanentRes);
    history.replace("/feed")
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


      if(arr.length > 0) {
        return (
          <>
            <h4>Visitors:</h4>
            <div className="buttonWrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={()=>{history.push("/servantForm")}}
                disableElevation
              >
                Edit Visitors
              </Button>
            </div>
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
      }else{
        return <div>No Visitors Found
          <div className="buttonWrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={()=>{history.push("/servantForm")}}
                disableElevation
              >
                Edit Visitors
              </Button>
            </div>
        </div>;
      }
    } else {
      return <div>Loading...</div>;
    }
  };

  const ViewVehicle = (e) => {

    if (vehicle) {
      let arr = [];
      let keys = [];
      for (let i = 0; i < vehicle.length; i++) {
        const element = vehicle[i];
        if (!element.deleted) {
          arr.push(element);
          keys.push(i);
        }
      }


      if(arr.length > 0) {
          return (
            <>
              <h4>Vehicle:</h4>
              <div className="buttonWrapper">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>{history.push("/vehicleForm")}}
                  disableElevation
                >
                  Edit Vehicles
                </Button>
              </div>
              {arr.map((visitor, index) => {
                return (
                  <>
                  <div className={styles.gridContainer} key={index}>
                    <div className={styles.gridItem}>Name:</div>
                    <div className={styles.gridItem}>{visitor.name}</div>
                    <div className={styles.gridItem}>Type:</div>
                    <div className={styles.gridItem}>{visitor.type}</div>
                    <div className={styles.gridItem}>Registration Number:</div>
                    <div className={styles.gridItem}>{visitor.regNo}</div>
                    
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
          return <div style={{ height: 30 }} >No Vehicles Found
            <div className="buttonWrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={()=>{history.push("/servantForm")}}
                disableElevation
              >
                Edit Visitors
              </Button>
            </div>
          </div>;
      }
    } else {
      return <div style={{ height: 30 }} >No Vehicles Found</div>;
    }
  };

  return (
    <div>
      <UserNavigation />
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <h2>User Profile</h2>
          {error && (
            <div>
              <h3 style={{ color: "red" }}>{error}</h3>
            </div>
          )}
          {status === 0 && (
            <section>
              {displayImage && (
                <img
                  src={displayImage}
                  style={{ width: 200, height: 200, borderRadius: "50%" }}
                  alt={"pic"}
                />
              )}
              <div style={{ height: 30 }} />
              <div className={styles.imageSelection}>
                <p>Change your Profile Picture:</p>
                <label for="myfile">
                  <ImageIcon />
                </label>

                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  accept=".jpg, .png, .jpeg, .jfif, .gif, .bmp, .tif, .tiff|image/*"
                  onChange={handleImage}
                />
              </div>
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
                  <div className={styles.gridContainer}>
                    <div className={styles.gridItem}>Name :</div>
                    <div className={styles.gridItem}>{user.name}</div>
                    <div className={styles.gridItem}>Email :</div>
                    <div className={styles.gridItem}>{user.email}</div>
                    <div className={styles.gridItem}>Villa Type :</div>
                    <div className={styles.gridItem}>{user.villaType}</div>
                    <div className={styles.gridItem}>Phone Number:</div>
                    <div className={styles.gridItem}>
                      <TextField
                        type="tel"
                        variant="outlined"
                        margin="dense"
                        style={{ width: 200 }}
                        value={phonenumber}
                        onChange={(e) => setphonenumber(e.target.value)}
                      />
                    </div>
                    <div className={styles.gridItem}>Permanent Residents :</div>
                    <div className={styles.gridItem}>
                      <TextField
                        type="number"
                        variant="outlined"
                        margin="dense"
                        style={{ width: 200 }}
                        value={permanentRes}
                        onChange={(e) => setpermanentRes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ height: 30 }} />

                  <div style={{ height: 30 }} />
                  <ViewVisitor />
                  <div style={{ height: 30 }} />
                  <ViewVehicle/>
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
                  Update Profile
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

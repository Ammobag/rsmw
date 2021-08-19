import { React, useState } from "react";
import "./UserActions/AddPost.module.css";
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

import { deleteVisitorData } from "../functions/dbquery";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function UserProfile() {
  const [image, setImage] = useState("");
  const [displayImage, setdisplayImage] = useState("");
  const [status, setstatus] = useState(0);
  const [progress, setprogress] = useState(0);
  const [user, setuser] = useState(null);
  const [phonenumber, setphonenumber] = useState();
  const [permanentRes, setpermanentRes] = useState();
  const [visitors, setvisitors] = useState();
  const [error, seterror] = useState("");

  const history = useHistory();
  var database = firebase.database();

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
          if (user) {
            console.log("File available at", downloadURL);
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
      console.log(image);
      var timestamp = Date.now();
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
    
  };

  const handleDeleteVisitor = (index) => {
    console.log(index)
    deleteVisitorData(user.UID, index);
  }

  const ViewVisitor = (e) => {
    console.log(visitors);
    if(visitors){
      let arr = [];
      let keys = [];
      for (let i = 0; i < visitors.length; i++) {
        const element = visitors[i];
        console.log(element)
        if(!element.deleted){
          arr.push(element)
          keys.push(i)
        }
      }

      console.log(arr, keys);
      

      return(
        <div>
          Visitors :
        {
          
          arr.map((visitor, index) => {
            return(
              <div key={index} >
                <div>Name : {visitor.name}</div>
                <div>Purpose : {visitor.purpose}</div>
                <div>Contact : {visitor.contact}</div>
                <button onClick={(e) => handleDeleteVisitor(keys[index])}>Delete</button>
              </div>
            )
          })
          
        }
        </div>
      )
    }else{
      return(
        <div>Loading...</div>
      );
    }   
  }

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
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }} >
                  <div style={{ height: 30 }} />
                  
                    <div>
                      <div>Name : {user.name} </div>
                      <div style={{ height: 30 }} />
                      <div> Email : {user.email}</div>
                      <div style={{ height: 30 }} />
                      <div> Line No : {user.lineno}</div>
                      <div style={{ height: 30 }} />
                    </div>
                  
                  <div className={styles.phoneNumberWrapper}>
                    <div>Phone Number : </div>
                    <input
                      className="inputField"
                      typr="tel"
                      value={phonenumber}
                      onChange={(e) => setphonenumber(e.target.value)}
                    />
                  </div>
                  <div style={{ height: 30 }} />
                  <div className={styles.phoneNumberWrapper}>
                    <div>Permanent Residents : </div>
                    <input
                      className="inputField"
                      typr="tel"
                      value={permanentRes}
                      onChange={(e) => setpermanentRes(e.target.value)}
                    />
                  </div>
                  <div style={{ height: 30 }} />
                  <ViewVisitor/>
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

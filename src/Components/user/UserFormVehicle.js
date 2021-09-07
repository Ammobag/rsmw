import { React, useState } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import styles from "./UserFormVehicle.module.css";
import TextField from "@material-ui/core/TextField";
import { deleteVisitorData } from "../functions/dbquery";
import { useHistory } from "react-router-dom";
import logo from "../../Assets/logo.png";


export default function UserFormVehicle() {
  const [status, setstatus] = useState(0);
  const [user, setuser] = useState(null);
  const [newVisitorName, setNewVisitorName] = useState("");
  const [newVisitorPurpose, setNewVisitorPurpose] = useState("");
  const [newVisitorContact, setNewVisitorContact] = useState("");
  const [vehicle, setvehicle] = useState();
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
          setvehicle(users.vehicle);
        });
      }
    });
  }

  const handleSubmit = (e) => {
    if (user && newVisitorContact && newVisitorName && newVisitorPurpose) {
      setstatus(1);

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .database()
            .ref("users/" + user.uid + "/vehicle/" + vehicle.length)
            .set({
              name: newVisitorName,
              regNo: newVisitorContact,
              type: newVisitorPurpose,
            });
          firebase
            .database()
            .ref("users/" + user.uid + "/vehicle/")
            .child("length")
            .set(vehicle.length + 1);
          setstatus(0);
          var Ref = database.ref("users/" + user.uid + "/");
          Ref.once("value", (snapshot) => {
            var users = snapshot.val();
            setvehicle(users.vehicle);
          });
        }
      });
    }
  };

  const handleNext = (e) => {
    history.replace("/feed");
  };

  const handleDeleteVisitor = (index) => {
    deleteVisitorData(user.UID, index);
  };

  const ViewVisitor = (e) => {
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

      if (arr.length > 0) {
        return (
          <>
            <h4>Vehicle:</h4>
            {arr.map((visitor, index) => {
              return (
                <div className={styles.gridContainer} key={index}>
                  <div className={styles.gridItem}>Name:</div>
                  <div className={styles.gridItem}>{visitor.name}</div>
                  <div className={styles.gridItem}>Type:</div>
                  <div className={styles.gridItem}>{visitor.type}</div>
                  <div className={styles.gridItem}>Registration Number:</div>
                  <div className={styles.gridItem}>{visitor.regNo}</div>
                  <button onClick={(e) => handleDeleteVisitor(keys[index])}>
                    Delete
                  </button>
                </div>
              );
            })}
          </>
        );
      } else {
        return <div style={{ height: 30 }}>No Vehicles Found</div>;
      }
    } else {
      return <div style={{ height: 30 }}>No Vehicles Found</div>;
    }
  };

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <img src={logo} alt="logo" />

          <h2>Vehicle Details Form</h2>
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
                  <div style={{ height: 30 }} />
                  <>
                    <h4> Add New Vehicle</h4>
                    <div className={styles.gridContainer}>
                      <div className={styles.gridItem}>Vehicle Name:</div>
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
                      <div className={styles.gridItem}>Vehicle Type:</div>
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
                      <div className={styles.gridItem}>
                        Registration Number:
                      </div>
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
                  </>
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
              <div>Adding New Vehicle</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

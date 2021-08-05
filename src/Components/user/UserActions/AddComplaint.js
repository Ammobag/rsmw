import { React, useState } from "react";
import "./AddPost.css";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../../firebase";
import { postComplaint, uploadPost } from "../../functions/dbquery";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

// var database = firebase.database();

// var Ref = database.ref('admin/');
// Ref.on('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

export default function AddComplaint() {
  const [subject, setsubject] = useState("");
  const [status, setstatus] = useState(0);
  const [body, setbody] = useState("");
  const [token, settoken] = useState(null);
  const [error, seterror] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    if (subject && body) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          var timestamp = Date.now();
          console.log(uid, subject, body, timestamp);
          postComplaint(uid, subject, body, timestamp);
          settoken(timestamp);
          setstatus(1)
        }
      });      
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <h2>Create Complaints</h2>
        {error && (
          <div>
            <h3 style={{ color: "red" }}>{error}</h3>
          </div>
        )}
        {status === 0 && (
          <section>
            <div className="textField-wrapper">
              <div>
                <TextField
                  id="subject"
                  label="Complaint Subject"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  style={{ margin: 8 }}
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                />
              </div>
              <form>
                <textarea
                  placeholder="Write about your complsints here ..."
                  onChange={(e) => setbody(e.target.value)}
                  value={body}
                  style={{ width: 400}}
                ></textarea>
              </form>
              
            </div>
            
            <div className="buttonWrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disableElevation
              >
                Lodge Complaint
              </Button>
            </div>
          </section>
        )}

        {status === 1 && (
          <div>
            <h3 style={{ color: "green" }}>Complaint Lodged Successfully</h3>
            <h4>Your Complaint Token is : <strong>{token}</strong></h4>
            <p>Use this token to check status of your Complaint</p>
          </div>
        )}
      </div>
    </div>
  );
}

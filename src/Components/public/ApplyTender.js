import { React, useState } from "react";
import styles from "./ApplyTender.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FileCopyIcon from "@material-ui/icons/FileCopy";


import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {} from "../firebase";
import { uploadTenderApplication } from "../functions/dbquery";

export default function AddClassified(props) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setstatus] = useState(0);
  const [name, setname] = useState("");

  const handleImage = (e) => {
    console.log("in handle image");
    console.log(e.target.files);
    setImage(e.target.files);
  };

  console.log(props.match.params.id)

  const handleSubmit = async (e) => {
    if (image && phone && email && description && name) {
      setstatus(1);
      const timestamp = Date.now();
      for (let i = 0; i < image.length; i++) {
        const element = image[i];
        
        var storageRef = firebase.storage().ref();
        var filename = element.name;
        // eslint-disable-next-line
        var uploadTask = await storageRef
          .child("tenderapplication/"+ timestamp + "/" + filename)
          .put(element);


      }

      uploadTenderApplication(timestamp, name, phone, email, description, props.match.params.id );
      setstatus(2);        

    } else {
      alert("Enter all the fields");
    }
  };

  const DisplayFiles = ()=>{
    if (image){
      let arr = []
      console.log("Print", image.length)
      for (let i = 0; i < image.length; i++) {
        const element = image[i];
        console.log(element.name)
        arr.push(element)
      }
      return(arr.map((value, index)=>{
         return(<div key={index}>{value.name}</div>)
      }))
     
    }else{
      return( <div></div> )
    }
  }

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div style={{ height: 30 }} />
          <h3>Apply for a Tender</h3>
          <div style={{ height: 30 }} />
          {status === 0 && (
            <section>
              <form style={{ display: "flex", flexDirection: "column" }}>

                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  value={name}
                  fullWidth
                  onChange={(e) => setname(e.target.value)}
                />
                <div style={{ height: 30 }} />
                
                <TextField
                  id="phoneNo"
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  margin="dense"
                  value={phone}
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div style={{ height: 30 }} />

                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="dense"
                  value={email}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ height: 30 }} />

                <TextField
                  id="description"
                  label="Description"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  value={description}
                  fullWidth
                  onChange={(e) => setdescription(e.target.value)}
                />
                <div style={{ height: 30 }} />
              </form>
              <div style={{ height: 30 }} />
              <div className={styles.imageSelection}>
                <p>Add Documents:</p>

                <label for="myfile">
                  <FileCopyIcon />
                </label>

                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  accept=".pdf, .jpg, .png, .jpeg, .jfif, .gif, .bmp, .tif, .tiff|image/*"
                  onChange={handleImage}
                  multiple
                />
                
                
              </div>
              <DisplayFiles/>

              <div style={{ height: 30 }} />
              <div className={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Apply Now
                </Button>
              </div>
              <div style={{ height: 30 }} />
            </section>
          )}

          {status === 1 && (
            <div style={{ padding: 50 }}>
              <div>Uploading Files ...</div>
            </div>
          )}

          {status === 2 && (
            <div>
              <h3 style={{ color: "green" }}>Applied Successfully</h3>
              <h5 style={{ color: "green" }}>Wait for Admin's Approval</h5>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: 30 }} />
    </div>
  );
}


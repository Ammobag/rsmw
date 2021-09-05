import React, { useEffect } from "react";
import styles from "./Gallery.module.css";
import slider1 from "../../Assets/slider1.jpeg";
import slider2 from "../../Assets/slider2.jpeg";
import slider3 from "../../Assets/slider3.jpeg";
import slider4 from "../../Assets/slider4.jpeg";
import firebase from "firebase";
export default function Gallery() {
  // Create a reference with an initial file path and name
  var storageRef = firebase.storage().ref("gallery/").listAll();
  useEffect(() => {
    storageRef

      .then((ListResult) => {
        ListResult.items.forEach((element) => {
          element.getDownloadURL().then((url) => console.log(url));
        });
      })
      .catch((error) => {
        // Handle any errors
        console.log("error:", error);
      });
      // eslint-disable-next-line
  }, []);
  return (
    <div>
      <img alt="img" src={slider1} className={styles.img} />
      <img alt="img" src={slider2} className={styles.img} />
      <img alt="img" src={slider3} className={styles.img} />
      <img alt="img" src={slider4} className={styles.img} />
    </div>
  );
}

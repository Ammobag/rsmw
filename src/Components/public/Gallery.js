import React, { useState } from "react";
import styles from "./Gallery.module.css";
import slider1 from "../../Assets/slider1.jpeg";
import slider2 from "../../Assets/slider2.jpeg";
import slider3 from "../../Assets/slider3.jpeg";
import slider4 from "../../Assets/slider4.jpeg";
import firebase from "firebase";


export default function Gallery() {
  const [images, setimages] = useState([])
  // Create a reference with an initial file path and name
  
  let list = []

  const fetchAsync = async() =>{
    var storageRef = await firebase.storage().ref("gallery/").listAll();

    for (let i = 0; i < storageRef.items.length; i++) {
      const element = storageRef.items[i];
      var link = await element.getDownloadURL()
      console.log(link)
      list.push(link)
    }

    console.log(list.length)

    if(list.length > 0){
      setimages(list)
    }
  }


  images.forEach((element) => {
    console.log(element)
  })
  console.log("Images", images)
  console.log("Length", images.length)
  if(images.length > 0){
    return images.map((value, index)=>{
      return(<img alt="img" key={index} src={value} className={styles.img} />)
    })
  }else{
    fetchAsync()
    return (
      <div>
        <img alt="img" src={slider1} className={styles.img} />
        <img alt="img" src={slider2} className={styles.img} />
        <img alt="img" src={slider3} className={styles.img} />
        <img alt="img" src={slider4} className={styles.img} />
      </div>
    );
  }
}

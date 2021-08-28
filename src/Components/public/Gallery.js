import React from "react";
import styles from "./Gallery.module.css";
import slider1 from "../../Assets/slider1.jpeg";
import slider2 from "../../Assets/slider2.jpeg";
import slider3 from "../../Assets/slider3.jpeg";
import slider4 from "../../Assets/slider4.jpeg";
export default function Gallery() {
  return (
    <div>
      <img alt="img" src={slider1} className={styles.img} />
      <img alt="img" src={slider2} className={styles.img} />
      <img alt="img" src={slider3} className={styles.img} />
      <img alt="img" src={slider4} className={styles.img} />
    </div>
  );
}

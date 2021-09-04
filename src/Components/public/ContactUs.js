import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
export default function ContactUs() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [description, setDescription] = useState();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginRight: "auto",
        marginLeft: "auto",
        width: "80vw",
        justifyContent: "space-around",
        padding: "50px",
      }}
    >
      <div>
        <iframe
          width="600"
          height="450"
          style={{ border: "none" }}
          title="Ideal Villas"
          loading="lazy"
          allowfullscreen
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJO6XXAhB3AjoRh3BIux1hXus&key=AIzaSyDCaAaHzmnnHKc1peMMX367k1-v08EVufw"
        ></iframe>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Facility Manager - John Doe</h2>
        <br />
        <p>Contact At - 9807000000</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Contact Us</h2>
        <br />
        <TextField
          id="name"
          label="Name"
          type="text"
          variant="outlined"
          margin="dense"
          style={{ width: 200 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="dense"
          style={{ width: 200 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="phoneNo"
          label="Phone Number"
          type="tel"
          variant="outlined"
          margin="dense"
          style={{ width: 200 }}
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          type="text"
          variant="outlined"
          margin="dense"
          style={{ width: 200 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" style={{ marginTop: 30 }}>
          Submit
        </Button>
      </div>
    </div>
  );
}

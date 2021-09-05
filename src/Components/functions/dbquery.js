import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";
import { useState, useEffect } from "react";

export default function Getonce(reference) {
  const [data, setdata] = useState();
  var database = firebase.database();

  useEffect(() => {
    var Ref = database.ref(reference);
    Ref.once("value", (snapshot) => {
      var query = snapshot.val();
      setdata(query);
    });
    // eslint-disable-next-line
  }, []);

  return data;
}

export function Getuser(uid) {
  const [data, setdata] = useState();
  var database = firebase.database();

  useEffect(() => {
    var Ref = database.ref("users/" + uid + "/");
    Ref.once("value", (snapshot) => {
      var query = snapshot.val();
      setdata(query);
    });
    // eslint-disable-next-line
  }, []);

  return data;
}

export function Getname(uid) {
  var data = Getuser(uid);
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (key === "name") return element;
    }
  }
}

export function writeUserData(
  UID,
  name,
  email,
  phonenumber,
  lineno,
  img
) {
  console.log("in writeuserdata");
  firebase
    .database()
    .ref("users/" + UID + "/")
    .set({
      UID: UID,
      name: name,
      email: email,
      phonenumber: phonenumber,
      image: img,
      permanentRes: 0,
    });
}

export function deleteVisitorData(
  UID,
  index
) {
  firebase
    .database()
    .ref("users/" + UID + "/visitors/"+index + "/")
    .child("deleted")
    .set(true);
}

export function uploadPost(UID, body, image) {
  var timestamp = Date.now();
  firebase
    .database()
    .ref("posts/" + timestamp + "/")
    .set({
      UID: UID,
      postID: timestamp,
      timestamp: timestamp,
      body: body,
      image: image,
    });
}

export function uploadContactor(id, name, phone, email, category, description) {
  firebase
    .database()
    .ref("contractors/" + id + "/")
    .set({
      id: id,
      contractorCategory: category,
      contractorContact: phone, 
      contractorName: name,
      email: email,
      description: description,
      approved: false,
    });
}

export function uploadEvent(body, image, name) {
  var timestamp = Date.now();
  firebase
    .database()
    .ref("events/" + timestamp + "/")
    .set({      
      timestamp: timestamp,
      name: name,
      body: body,
      image: image,
    });
}

export function uploadClassified(UID, body, image, phone, email, address) {
  var timestamp = Date.now();
  firebase
    .database()
    .ref("classified/" + timestamp + "/")
    .set({
      UID: UID,
      timestamp: timestamp,
      caption: body,
      images: image,
      phoneNumber: phone,
      email: email,
      address: address,
    });
}

export function likePost(UID, postID, value) {
  firebase
    .database()
    .ref("posts/" + postID + "/likes/" + UID + "/")
    .set({
      status: value,
    });
}

export function commentPost(UID, postID, message) {
  var timestamp = Date.now();
  firebase
    .database()
    .ref("posts/" + postID + "/comments/" + timestamp + "/")
    .set({
      UID: UID,
      timestamp: timestamp,
      comments: message,
    });
}

export function postTransaction(UID, amount, month, year) {
  var timestamp = Date.now();
  firebase
    .database()
    .ref("maintenance/" + timestamp + "/")
    .set({
      UID: UID,
      amount: amount,
      dueYear: year,
      dueMonth: month,
      paidDate: "-",
      status: "Not Paid",
    });
}

export function postNotification(issuer, designation, subject, body) {
  var timestamp = Date.now();
  const d = new Date();
  var i = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  firebase
    .database()
    .ref("notices/" + timestamp + "/")
    .set({
      body: body,
      date: i,
      issuerDesignation: designation,
      issuerName: issuer,
      subject: subject,
    });
}

export function postComplaint(uid, subject, body, timestamp) {
  const d = new Date();
  var i = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  firebase
    .database()
    .ref("complaints/" + timestamp + "/")
    .set({
      UID: uid,
      body: body,
      dateClosed: "-",
      dateOpened: i,
      status: "open",
      subject: subject,
    });
}

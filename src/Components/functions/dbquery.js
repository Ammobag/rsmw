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

export function writeUserData(UID, name, email, phonenumber, flatno, blockno) {
  firebase
    .database()
    .ref("users/" + UID + "/")
    .set({
      UID: UID,
      name: name,
      email: email,
      phonenumber: phonenumber,
      flatno: flatno,
      blockno: blockno,
    });
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

export function likePost(UID, postID, value) {
    firebase.database().ref('posts/' + postID + '/likes/' + UID + "/").set({
        status: value,
    });
}

export function commentPost(UID, postID, message) {
  var timestamp = Date.now();
  firebase.database().ref('posts/' + postID + '/comments/' + timestamp + "/").set({
      UID: UID,
      timestamp: timestamp,
      comments: message,
  });
}

export function postTransaction(UID, amount, month, year) {
  var timestamp = Date.now();
  firebase.database().ref('maintenance/' + timestamp + "/").set({
      UID: UID,
      amount: amount,
      dueYear: year,
      dueMonth: month,
      paidDate: "-",
      status: "Not Paid"
  });
}
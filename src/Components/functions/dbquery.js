
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
        Ref.once('value', (snapshot) => {
            var query = snapshot.val();
            setdata(query)
        })
    }, []);

    return data;
    
}

export function Getuser(uid){
    const [data, setdata] = useState();
    var database = firebase.database();

    useEffect(() => {
        var Ref = database.ref("users/" + uid + "/");
        Ref.once('value', (snapshot) => {
            var query = snapshot.val();
            setdata(query)
        })
    }, []);
    
    return data;
}

export function Getname(uid){
    var data = Getuser(uid)
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if(key === 'name')
                return element;
    
        }
      }
    
}


import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {} from "../firebase";

export default function logout() {
    firebase.auth().signOut().then(() => {
        console.log('Signed Out');
      }).catch((error) => {
        console.log(error);
      });
}

import firebase  from "firebase";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyCz5szAqKD8Fb4UKj07dkgx1kdX5AU4hPc",
    authDomain: "wintowin-34f5b.firebaseapp.com",
    projectId: "wintowin-34f5b",
    storageBucket: "wintowin-34f5b.appspot.com",
    messagingSenderId: "513868192713",
    appId: "1:513868192713:web:4238738534760a09632618"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db    = firebase.firestore();
  const recap = firebase.auth.RecaptchaVerifier

  export default {
      firebase,
      db,
      firebaseConfig,
      recap
  }
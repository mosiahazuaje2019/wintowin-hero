import firebase  from "firebase";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyDCosAACiucE0-BuG-jxoqYa5kdmP7Db1U",
    authDomain: "wintowin-admin.firebaseapp.com",
    projectId: "wintowin-admin",
    storageBucket: "wintowin-admin.appspot.com",
    messagingSenderId: "201645717063",
    appId: "1:201645717063:web:8cb8aa978af80626e32362"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db    = firebase.firestore();
  const recap = firebase.auth.RecaptchaVerifier

  export default {
      firebase,
      db,
      recap
  }
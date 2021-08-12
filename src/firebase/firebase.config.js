import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBRd_U3AwxXFR9-1SHHByMc_mj89URDeHI",
  authDomain: "theartcoliseum-3f17d.firebaseapp.com",
  projectId: "theartcoliseum-3f17d",
  storageBucket: "theartcoliseum-3f17d.appspot.com",
  messagingSenderId: "1051191411626",
  appId: "1:1051191411626:web:602fe3648a847978aba1d3",
  measurementId: "G-2BVSM1B0GE"
};

firebase.initializeApp(firebaseConfig);
window.firebase = firebase;


export default firebase;
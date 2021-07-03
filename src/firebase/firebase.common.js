import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";

  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const createUser = (email, password, success, failure) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        success(user);
        // ...
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        failure(errorMessage);
        // ..
    });
}

export default createUser;

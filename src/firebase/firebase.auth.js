import firebase from './firebase.config';
import "firebase/auth";
import handleApiError from '../util/ErrorHandler';
import { getUserObject, createUserObject } from './firebase.db';


const createUser = (email, password, userDetails, successCallback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        if(user) {
            createUserObject(userDetails, successCallback);
        }        
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const signInUser = (email, password, successCallback) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        if(userCredential.user) {
            getUserObject(email, successCallback);
        }
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const isUserActive = () =>{
    const user = firebase.auth().currentUser;
    if(user) {
        return true;
    }
    return false;
}

const forgetPassword = (email,successCallback , failedCallback) =>{
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        successCallback(true);
    })
    .catch((error) => {
        handleApiError(error);
        failedCallback(error);
    });
}

const signout = (successCallback) => {
    firebase.auth().signOut().then(() => {
        successCallback();
      }).catch((error) => {
        handleApiError(error);
      });
}

export {
    createUser,
    signInUser,
    isUserActive,
    forgetPassword,
    signout
}

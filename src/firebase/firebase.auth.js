import firebase from "firebase/app";
import "firebase/auth";
import handleApiError from '../util/ErrorHandler';


const createUser = (email, password, successCallback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        successCallback(user);
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const signInUser = (email, password, successCallback) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        successCallback(user);
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

export {
    createUser,
    signInUser,
    isUserActive,
    forgetPassword
}

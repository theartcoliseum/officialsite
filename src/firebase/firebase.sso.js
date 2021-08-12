import firebase from './firebase.config';
import "firebase/auth";
import "firebase/firestore";
import handleApiError from '../util/ErrorHandler';
import { loginRequestBundle, createUserObject, isExistngUser } from './firebase.db';

const db = firebase.firestore();

const googleSignIn = (successCallback) =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        db.collection("users").where("email", "==", result.user.email)
        .get().then((querySnapshot) => {
            if(querySnapshot['docs'].length>0){
                loginRequestBundle(result.user.email,successCallback);
            }
            else{
                const userObject = {
                    city: "",
                    email: result.user.email,
                    f_name: result.user.displayName.split(" ")[0],
                    l_name: result.user.displayName.split(" ")[1],
                    mobile: "",
                    roles: ["USER"]
                }
                createUserObject(userObject,successCallback)
            }
        })
        .catch((error) => {
            handleApiError(error);
        });
    }).catch((error) => {
        handleApiError(error);
    });
}

const facebookSignIn = (successCallback) =>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        db.collection("users").where("email", "==", result.user.email)
        .get().then((querySnapshot) => {
            if(querySnapshot['docs'].length>0){
                loginRequestBundle(result.user.email,successCallback);
            }
            else{
                const userObject = {
                    city: "",
                    email: result.user.email,
                    f_name: result.user.displayName.split(" ")[0],
                    l_name: result.user.displayName.split(" ")[1],
                    mobile: "",
                    roles: ["USER"]
                }
                createUserObject(userObject,successCallback)
            }
        })
        .catch((error) => {
            handleApiError(error);
        });
    }).catch((error) => {
        handleApiError(error);
    });
}

const twitterSignIn = (successCallback) =>{
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        db.collection("users").where("email", "==", result.user.email)
        .get().then((querySnapshot) => {
            if(querySnapshot['docs'].length>0){
                loginRequestBundle(result.user.email,successCallback);
            }
            else{
                const userObject = {
                    city: "",
                    email: result.user.email,
                    f_name: result.user.displayName.split(" ")[0],
                    l_name: result.user.displayName.split(" ")[1],
                    mobile: "",
                    roles: ["USER"]
                }
                createUserObject(userObject,successCallback)
            }
        })
        .catch((error) => {
            handleApiError(error);
        });
    }).catch((error) => {
        handleApiError(error);
    });
}

const appleSignIn = ()=>{
    var error = {
        message:'Apple Sign-in is not yet enabled!'
    }
    handleApiError(error);
}



export {
    googleSignIn,
    facebookSignIn,
    twitterSignIn,
    appleSignIn
}
import firebase from './firebase.config';
import "firebase/auth";
import "firebase/firestore";
import handleApiError from '../util/ErrorHandler';
import { getUserObject, createUserObject, isExistngUser } from './firebase.db';

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
                getUserObject(result.user.email,successCallback);
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

export {
    googleSignIn
}
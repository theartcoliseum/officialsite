import firebase from './firebase.config';
import "firebase/firestore";
import handleApiError from '../util/ErrorHandler';

const db = firebase.firestore();


// USER FUNCTIONS
const createUserObject = (userDetails, successCallback) => {
    db.collection("users").add({...userDetails})
    .then((docRef) => {
        console.log(docRef);
        successCallback({...userDetails, id:docRef.id});
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const getUserObject = (email, successCallback) => {
    db.collection("users").where("email", "==", email)
    .get()
    .then((querySnapshot) => {
        let user = {};
        querySnapshot.forEach((doc) => {
            user = {id: doc.id, ...doc.data()}
        });
        successCallback(user);
    })
    .catch((error) => {
        handleApiError(error);
    });
}

export {
    createUserObject,
    getUserObject
};
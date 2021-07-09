import firebase from './firebase.config';
import "firebase/firestore";
import handleApiError from '../util/ErrorHandler';
import { uploadFile } from './firebase.storage';

const db = firebase.firestore();


// USER FUNCTIONS
const createUserObject = (userDetails, successCallback) => {
    db.collection("users").add({...userDetails})
    .then((docRef) => {
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

// EVENT FUNCTIONS
const createEvent = async ({e_date, e_time, poster_link_big, name, poster_link_small, ...eventDetails}, successCallback) => {
    const uploadBigposter = await uploadFile(poster_link_big, `events/${name}/poster_big.jpg`);
    const uploadSmallposter = await uploadFile(poster_link_small, `events/${name}/poster_small.jpg`);

    db.collection("events").add({datetime: firebase.firestore.Timestamp.fromDate(new Date(`${e_date} ${e_time}`)), 
    name,
    poster_link_big: uploadBigposter,
    poster_link_small: uploadSmallposter,
    ...eventDetails})
    .then((docRef) => {
        successCallback({id:docRef.id,e_date, e_time, poster_link_big: uploadBigposter,
            poster_link_small: uploadSmallposter, ...eventDetails});
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const getUpcomingEvents = (successCallback) => {
    const today = new Date();
    db.collection("events").where("datetime", ">", today)
    .get()
    .then((querySnapshot) => {
        let events = [];
        querySnapshot.forEach((doc) => {
            events.push({id: doc.id, ...doc.data()});
        });
        successCallback(events);
    })
    .catch((error) => {
        handleApiError(error);
    });
};

const getAllPastEvents = (successCallback) => {
    const today = new Date();
    db.collection("events").where("datetime", "<=", today)
    .get()
    .then((querySnapshot) => {
        let events = [];
        querySnapshot.forEach((doc) => {
            events.push({id: doc.id, ...doc.data()});
        });
        successCallback(events);
    })
    .catch((error) => {
        handleApiError(error);
    });
};

const getPastEventsParticipated = () => {

};

const getPastEventsAudience = () => {

};

export {
    createUserObject,
    getUserObject,
    createEvent,
    getUpcomingEvents,
    getAllPastEvents
};
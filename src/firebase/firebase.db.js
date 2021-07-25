import firebase from './firebase.config';
import "firebase/firestore";
import handleApiError from '../util/ErrorHandler';
import { uploadFile } from './firebase.storage';

const db = firebase.firestore();


// USER FUNCTIONS
const createUserObject = (userDetails, successCallback) => {
    db.collection("users").add({...userDetails})
    .then((docRef) => {
        successCallback({user: {...userDetails, id:docRef.id}, events: []});
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const getUserObject = (email) => {
    const promise = new Promise((resolve, reject) => {
        db.collection("users").where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            let user = {};
            querySnapshot.forEach((doc) => {
                user = {id: doc.id, ...doc.data()}
            });
            resolve(user);
        })
        .catch((error) => {
            reject(error);
        });
    });
    return promise;
}

const updateUserDB = (id,mobile,city,successCallback) =>{
    db.collection("users").doc(id).update({
        mobile:mobile,
        city:city
    })
    .then(()=>{
        successCallback();
    })
    .catch((error)=>{
        handleApiError(error);
    })
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
            const event = {id: doc.id, ...doc.data()};
            db.collection('participations').where('event', '==', `/events/${event.id}`)
            .get().then((queryS) => {
                queryS.forEach((doci) => {
                    event.participant = {id: doci.id, ...doci.data()};
                });
            })
            events.push(event);
        });
        successCallback(events);
    })
    .catch((error) => {
        handleApiError(error);
    });
};

const getUpcomingEventsWithParticipation = (userId) => {
    const promise = new Promise((resolve, reject) => {
        const today = new Date();
        db.collection("events").where("datetime", ">", today)
        .get()
        .then((querySnapshot) => {
            let events = [];
            querySnapshot.forEach((doc) => {
                const event = {id: doc.id, ...doc.data()};
                db.collection('participations').where('user', '==', `/users/${userId}`).where('event', '==', `/events/${event.id}`)
                .get().then((queryS) => {
                    queryS.forEach((doci) => {
                        event.participant = {id: doci.id, ...doci.data()};
                    });
                })
                events.push(event);
            });
            resolve({eventObj: events, label: 'upcomingEventsWithParticipation'});
        })
        .catch((error) => {
            reject(error);
        });
    });
    return promise;
};

const getAllPastEvents = () => {
    const promise = new Promise((resolve, reject) => {
        const today = new Date();
        db.collection("events").where("datetime", "<=", today)
        .get()
        .then((querySnapshot) => {
            let events = [];
            querySnapshot.forEach((doc) => {
                const event = {id: doc.id, ...doc.data()};
                db.collection('participations').where('event', '==', `/events/${event.id}`)
                .get().then((queryS) => {
                    queryS.forEach((doci) => {
                        event.participant = {id: doci.id, ...doci.data()};
                    });
                })
                events.push(event);
            });
            resolve({eventObj: events, label: 'allPastEvents'});
        })
        .catch((error) => {
            reject(error);
        });
    });
    return promise;
};

const getPastEventsParticipated = (userId) => {
    const promise = new Promise((resolve, reject) => {
        const today = new Date();
        db.collection("events").where("datetime", "<", today)
        .get()
        .then((querySnapshot) => {
            let events = [];
            querySnapshot.forEach((doc) => {
                const event = {id: doc.id, ...doc.data()};
                let participant = false;
                db.collection('participations').where('user', '==', `/users/${userId}`).where('event', '==', `/events/${event.id}`)
                .get().then((queryS) => {
                    queryS.forEach((doci) => {
                        event.participant = {id: doci.id, ...doci.data()};
                        participant = true;
                    });
                });
                if(participant) {
                    events.push(event);
                }
            });
            resolve({eventObj: events, label: 'pastEventsParticipated'});
        })
        .catch((error) => {
            reject(error);
        });
    });
    return promise;
};

const getPastEventsAudience = () => {

};

// Participation Functions
// EVENT FUNCTIONS
const createParticipation = async ({audition_link, audition_url,user, event, ...participationDetails}, successCallback) => {
    let link = '';
    if(audition_link) {
        link = await uploadFile(audition_link, `auditions/${event}/${user}/${audition_link.filename}`);
    } else {
        link = audition_url;
    }
    const participationObj = {
        user,
        event,
        dates: {
            registeredDate: firebase.firestore.Timestamp.fromDate(new Date())
        },
        audition: link,
        status: 'Registered',
        ...participationDetails
    };
    

    db.collection("participations").add(participationObj)
    .then((docRef) => {
        successCallback({id:docRef.id,...participationObj});
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const loginRequestBundle = (email, successCallback) => {
    getUserObject(email).then((user) => {
        const promises = [getPastEventsParticipated(user.id), getUpcomingEventsWithParticipation(user.id)];
        if((user.roles.findIndex((i) => i === 'SUPER ADMIN') >= 0)) {
            promises.push(getAllPastEvents());
        }
        Promise.all(promises).then((results) => {
            console.log({user, events: results});
            successCallback({user, events: results});
        });
    }).catch((error) => {
        handleApiError(error);
    });
};

export {
    createUserObject,
    createEvent,
    getUpcomingEvents,
    createParticipation,
    loginRequestBundle,
    getUpcomingEventsWithParticipation,
    updateUserDB
};
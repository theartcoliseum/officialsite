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
const createEvent = async ({poster_link_big, name, poster_link_small,e_date, ...eventDetails}, successCallback) => {
    const uploadBigposter = await uploadFile(poster_link_big, `events/${name}/poster_big.jpg`);
    const uploadSmallposter = await uploadFile(poster_link_small, `events/${name}/poster_small.jpg`);
    const parts = e_date.split('/');
    const actualDate = new Date(parts[2], parts[1] - 1, parts[0]);
    db.collection("events").add({
        e_date: firebase.firestore.Timestamp.fromDate(new Date(actualDate)),
        name,
        poster_link_big: uploadBigposter,
        poster_link_small: uploadSmallposter,
        ...eventDetails})
    .then((docRef) => {
        successCallback({id:docRef.id, poster_link_big: uploadBigposter, name,
            poster_link_small: uploadSmallposter,e_date:firebase.firestore.Timestamp.fromDate(new Date(actualDate)), ...eventDetails});
    })
    .catch((error) => {
        handleApiError(error);
    });
}

const getUpcomingEvents = (successCallback) => {
    const today = new Date();
    db.collection("events").where("e_date", ">=", today)
    .get()
    .then((querySnapshot) => {
        let events = [];
        querySnapshot.forEach(async (doc) => {
            const event = {id: doc.id, ...doc.data()};
            event.participant = [];
            const participants = await db.collection('participations').where('event', '==', `/events/${event.id}`).get();
            await participants.forEach(async (doci) => {
                let participantData = {id: doci.id, ...doci.data()};
                const userId = participantData.user.split('/')[2];
                const user = await db.collection('users').doc(userId).get();
                participantData = {...participantData, ...user.data()};
                event.participant.push({...participantData, ...user});
            });
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
        db.collection("events").where("e_date", ">=", today)
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
        db.collection("events").where("e_date", "<", today)
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
        db.collection("events").where("e_date", "<", today)
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

const updateEvent = async (eventDetails, successCallback) => {
    let {id, name, e_date, poster_big, poster_small, poster_link_big, poster_link_small, ...details} = eventDetails;
    // If files have changed then re-upload them
    if(poster_big) {
        poster_link_big = await uploadFile(poster_big, `events/${name}/poster_big.jpg`);
    }
    if(poster_small) {
        poster_link_small = await uploadFile(poster_small, `events/${name}/poster_big.jpg`);
    }

    // Date Handling
    const parts = e_date.split('/');
    const actualDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const eventObj = {e_date: firebase.firestore.Timestamp.fromDate(new Date(actualDate)),
        name,poster_link_big,poster_link_small, ...details};
    db.collection("events").doc(id).update(eventObj).then(() =>
        {
            console.log('Event Updated Successfully');
            successCallback(eventObj);
        }).catch((error) => {
            handleApiError(error);
        });
}

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
};

const updateParticipant = (participant) => {
    // REMOVING BAD FIELDS
    const {metadata, _userDataWriter, _key, _firestoreImpl, _firestore, _document, _delegate, _converter, ...actualObj} = participant;
    return new Promise((resolve, reject) => {
        db.collection("participations").doc(actualObj.id).update(actualObj).then(() =>
        {
            console.log("DONE!");
            resolve(participant);
        }).catch((error) => {
            reject(error);
        });
    })
}

const updateParticipationList = (participantsList, successCallback) => {
    const promiseList = [];
    participantsList.forEach((part) => {
        promiseList.push(updateParticipant(part));
    });
    Promise.all(promiseList).then(() => {
        console.log('Update Successful!');
        successCallback(participantsList);
    }).catch((error) => console.log(error));
}

const loginRequestBundle = (email, successCallback) => {
    getUserObject(email).then((user) => {
        const promises = [getPastEventsParticipated(user.id), getUpcomingEventsWithParticipation(user.id)];
        if((user.roles.findIndex((i) => i === 'SUPER ADMIN') >= 0)) {
            promises.push(getAllPastEvents());
        }
        Promise.all(promises).then((results) => {
            successCallback({user, events: results});
        });
    }).catch((error) => {
        handleApiError(error);
    });
};

const isDateValid = (date) => {
    if(date instanceof Date) {
        return true;
    } else {
        return false;
    }
}

export {
    createUserObject,
    createEvent,
    getUpcomingEvents,
    createParticipation,
    loginRequestBundle,
    getUpcomingEventsWithParticipation,
    updateEvent,
    updateParticipationList,
    updateUserDB
};
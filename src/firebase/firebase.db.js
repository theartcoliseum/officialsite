import firebase from './firebase.config';
import "firebase/firestore";
import handleApiError from '../util/ErrorHandler';
import { uploadFile } from './firebase.storage';

const db = firebase.firestore();



// USER FUNCTIONS
const createUserObject = (userDetails, successCallback) => {
    db.collection("users").add({ ...userDetails })
        .then((docRef) => {
            successCallback({ user: { ...userDetails, id: docRef.id }, events: [] });
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
                    user = { id: doc.id, ...doc.data() }
                });
                resolve(user);
            })
            .catch((error) => {
                reject(error);
            });
    });
    return promise;
}

const updateUserDB = (id, mobile, city, successCallback) => {
    db.collection("users").doc(id).update({
        mobile: mobile,
        city: city
    })
        .then(() => {
            successCallback(mobile, city);
        })
        .catch((error) => {
            handleApiError(error);
        })
}

// EVENT FUNCTIONS
const createEvent = async ({ poster_link_big, name, poster_link_small, e_date, ...eventDetails }, successCallback) => {
    const uploadBigposter = await uploadFile(poster_link_big, `events/${name}/poster_big.jpg`);
    const uploadSmallposter = await uploadFile(poster_link_small, `events/${name}/poster_small.jpg`);
    const parts = e_date.split('/');
    const actualDate = new Date(parts[2], parts[1] - 1, parts[0]);
    db.collection("events").add({
        e_date: firebase.firestore.Timestamp.fromDate(new Date(actualDate)),
        name,
        poster_link_big: uploadBigposter,
        poster_link_small: uploadSmallposter,
        ...eventDetails
    })
        .then((docRef) => {
            successCallback({
                id: docRef.id, poster_link_big: uploadBigposter, name,
                poster_link_small: uploadSmallposter, e_date: firebase.firestore.Timestamp.fromDate(new Date(actualDate)), ...eventDetails
            });
        })
        .catch((error) => {
            handleApiError(error);
        });
}

const getUpcomingEvents = (successCallback) => {
    const today = new Date();
    db.collection("events")
        .where("e_date", ">=", today)
        .get()
        .then(async (querySnapshot) => {
            let events = [];
            await Promise.all(querySnapshot.docs.map(async (doc) => {
                const event = { id: doc.id, ...doc.data() };
                event.participant = [];
                const participants = await db.collection('participations')
                    .where('event', '==', `/events/${event.id}`)
                    .get();
                await Promise.all(participants.docs.map(async (doci) => {
                    let participantData = { id: doci.id, ...doci.data() };
                    const userId = participantData.user.split('/')[2];
                    const user = await db.collection('users').doc(userId).get();
                    participantData = { ...participantData, ...user.data() };
                    event.participant.push({ ...participantData, ...user });
                }));
                const audience = await db.collection('audience').where('event', '==', `/events/${event.id}`).get();
                event.audience = [];
                audience.forEach(async (doci) => {
                    event.audience.push({ id: doci.id, ...doci.data() });
                });
                events.push(event);
            }));
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
                querySnapshot.forEach(async (doc) => {
                    const event = { id: doc.id, ...doc.data() };
                    const queryS = await db.collection('participations').where('user', '==', `/users/${userId}`).where('event', '==', `/events/${event.id}`).get();
                    queryS.forEach((doci) => {
                        event.participant = { id: doci.id, ...doci.data() };
                    });
                    const queryY = await db.collection('audience').where('user', '==', `/users/${userId}`).where('event', '==', `/events/${event.id}`).get();
                    queryY.forEach((doci) => {
                        event.audience = { id: doci.id, ...doci.data() };
                    });
                    if (event.audience || event.participant) {
                        events.push(event);
                    }
                });
                resolve({ eventObj: events, label: 'upcomingEventsWithParticipation' });
            })
            .catch((error) => {
                reject(error);
            });
    });
    return promise;
};

const getAllPastEvents = () => {
    const promise = new Promise(async (resolve, reject) => {
        const today = new Date();
        const querySnapshot = await db.collection("events").where("e_date", "<", today).get();
        let events = [];
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const event = { id: doc.id, ...doc.data() };
            let participant = false;
            event.participant = [];
            const queryS = await db.collection('participations').where('event', '==', `/events/${event.id}`).get();
            await Promise.all(queryS.docs.map((doci) => {
                event.participant.push({ id: doci.id, ...doci.data() });
                participant = true;
            }));
            let audience = false;
            event.audience = [];
            const queryY = await db.collection('audience').where('event', '==', `/events/${event.id}`).get();
            await Promise.all(queryY.docs.map((doci) => {
                event.audience.push({ id: doci.id, ...doci.data() });
                audience = true;
            }));
            if (audience || participant) {
                events.push(event);
            }
        }));
        resolve({ eventObj: events, label: 'pastAllEvents' });
    });
    return promise;
};

const getPastEventsParticipated = (userId) => {
    const promise = new Promise(async (resolve, reject) => {
        const today = new Date();
        const querySnapshot = await db.collection("events").where("e_date", "<", today).get();
        let events = [];
        let audienceCount = 0;
        let partCount = 0;
        let poll_good = 0;
        let poll_vgood = 0;
        let poll_excel = 0;
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const event = { id: doc.id, ...doc.data() };
            let participant = false;

            const queryS = await db.collection('participations').where('user', '==', `/users/${userId}`).where('event', '==', `/events/${event.id}`).get();
            await Promise.all(queryS.docs.map((doci) => {
                event.participant = { id: doci.id, ...doci.data() };
                participant = true;
                poll_good = poll_good + (event.participant.poll_good || 0);
                poll_vgood = poll_vgood + (event.participant.poll_vgood || 0);
                poll_excel = poll_excel + (event.participant.poll_excel || 0);
                partCount++;
            }));
            let audience = false;
            const queryY = await db.collection('audience').where('user', '==', `/users/${userId}`).where('event', '==', `/events/${event.id}`).get();
            await Promise.all(queryY.docs.map((doci) => {
                event.audience = { id: doci.id, ...doci.data() };
                audienceCount++;
                audience = true;
            }));
            if (audience || participant) {
                events.push(event);
            }
        }));
        if (partCount > 0) {
            poll_good = (poll_good / partCount);
            poll_vgood = (poll_vgood / partCount);
            poll_excel = (poll_excel / partCount);
        }
        resolve({ eventObj: events, label: 'pastEventsParticipated', extra: { partCount, audienceCount, poll_good, poll_vgood, poll_excel } });
    });
    return promise;
};

const getPastEventsAudience = () => {

};

const updateEvent = async (eventDetails, successCallback) => {
    let { id, name, e_date, poster_big, poster_small, poster_link_big, poster_link_small, ...details } = eventDetails;
    // If files have changed then re-upload them
    if (poster_big) {
        poster_link_big = await uploadFile(poster_big, `events/${name}/poster_big.jpg`);
    }
    if (poster_small) {
        poster_link_small = await uploadFile(poster_small, `events/${name}/poster_big.jpg`);
    }

    // Date Handling
    const parts = e_date.split('/');
    const actualDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const eventObj = {
        e_date: firebase.firestore.Timestamp.fromDate(new Date(actualDate)),
        name, poster_link_big, poster_link_small, ...details
    };
    db.collection("events").doc(id).update(eventObj).then(() => {
        console.log('Event Updated Successfully');
        successCallback(eventObj);
    }).catch((error) => {
        handleApiError(error);
    });
}

// Participation Functions
// EVENT FUNCTIONS
const createParticipation = async ({ audition_link, audition_url, user, event, ...participationDetails }, successCallback) => {
    let link = '';
    if (audition_link) {
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
        // accpettc:participationDetails.accpettc,
        // payment_id:participationDetails.payment_id,
        // perf_type:participationDetails.perf_type,
        // userObj: participationDetails.userObj
    };

    console.log(participationObj);
    db.collection("participations").add(participationObj)
        .then((docRef) => {
            successCallback({ id: docRef.id, ...participationObj });
        })
        .catch((error) => {
            handleApiError(error);
        });
};

const createAudience = async (eventDetails, successCallback) => {
    console.log(eventDetails);
    db.collection("audience").add(eventDetails)
        .then((docRef) => {
            successCallback({ id: docRef.id, ...eventDetails });
        })
        .catch((error) => {
            handleApiError(error);
        });
};

const updateParticipant = (participant) => {
    // REMOVING BAD FIELDS
    const { metadata, _userDataWriter, _key, _firestoreImpl, _firestore, _document, _delegate, _converter, ...actualObj } = participant;
    return new Promise((resolve, reject) => {
        db.collection("participations").doc(actualObj.id).update(actualObj).then(() => {
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
        if ((user.roles.findIndex((i) => i === 'SUPER_ADMIN') >= 0)) {
            promises.push(getAllPastEvents());
        }
        Promise.all(promises).then((results) => {
            successCallback({ user, events: results });
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
    updateEvent,
    updateParticipationList,
    updateUserDB,
    createAudience
};
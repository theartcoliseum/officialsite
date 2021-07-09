import React, { createContext, useState, useEffect } from "react";

const EventContext = createContext();

function EventContextCreator({ children }) {
    const eventDetails = useEventDetailsHook();
    return (
        <EventContext.Provider value={eventDetails}>
            {children}
        </EventContext.Provider>
    );
}

function useEventDetailsHook() {
    const [events, setEvents] = useState({
        pastMyParticipatedEvents: [],
        pastMyAttendedEvents: [],
        upcomingEvents: [],
        pastAllEvents: [],
        upcomingParticipatingEvents: [],
        upcomingAttendingEvents: [],
        eventsLoaded: false
    });

    useEffect(() => {
        if(events) {
            console.log('From Event Context....');
            console.log(events);
        }        
    }, [events])

    return {
        events,
        setEvents
    };
}


export {
    EventContext,
    EventContextCreator
};
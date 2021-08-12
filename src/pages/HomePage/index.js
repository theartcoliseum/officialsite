import React, { Fragment, useEffect, useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext';
import { getUpcomingEvents } from '../../firebase/firebase.db';
import Events from './Events';
import About from './About';
import Services from './Services';
import Team from './Team';

const HomePage = () => {

  const {setIsLoading} = useContext(AuthContext);
  const {events, setEvents} = useContext(EventContext);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  useEffect(() => {
    if(!events.eventsLoaded) {
      setIsLoading(true);
      getUpcomingEvents((event) => {
        const tempEvents = {...events};
        tempEvents.upcomingEvents = event;
        
        setDisplayedEvents([...event]);
        tempEvents.eventsLoaded = true;
        setEvents({...tempEvents });
        setIsLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if(events && events.upcomingEvents) {
      setDisplayedEvents([...events.upcomingEvents]);
    }
  }, [events.upcomingEvents]);

  return (
    <Fragment>
        <About />
        <Events eventlist={displayedEvents} />
        <Services />
        <Team />
    </Fragment>
  );
}

export default HomePage;
import React, { Fragment, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext';
import { getUpcomingEvents } from '../../firebase/firebase.db';
import Events from './Events';
import About from './About';
import Services from './Services';
import Team from './Team';

const HomePage = () => {

  const {user, setIsLoading} = useContext(AuthContext);
  const {events, setEvents} = useContext(EventContext);

  useEffect(() => {
    if(!events.eventsLoaded) {
      setIsLoading(true);
      getUpcomingEvents((event) => {
        const tempEvents = {...events};
        tempEvents.upcomingEvents = event;
        tempEvents.eventsLoaded = true;
        setEvents({...tempEvents });
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Fragment>
        <Events eventlist={events.upcomingEvents} />
        <About />
        <Services />
        <Team />
    </Fragment>
  );
}

export default HomePage;
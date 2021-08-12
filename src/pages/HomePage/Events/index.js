import React, { useState, useContext, useEffect } from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer, MDBRow, MDBCol, MDBModal, MDBBtn } from
  "mdbreact";
  import { useParams } from 'react-router-dom';
import firebase from "firebase/app";
import Login from '../../../components/Login'
import RegisterEvent from '../../RegisterEvent'
import { AuthContext } from '../../../context/AuthContext';
import { EventContext } from '../../../context/EventContext';
import handleApiError from '../../../util/ErrorHandler';

const Events = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [registerModalData, setRegisterModalData] = useState(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

  const { user, setUser, setIsLoading } = useContext(AuthContext);
  const {events, setEvents} = useContext(EventContext);
  let { id } = useParams();
  const [hitEvent, setHitEvent] = useState(null);
  const [displayedEvents, setDisplayedEvents] = useState([]);

  useEffect(() => {
    if(id) {
      setHitEvent(id);
    }
  }, [id]);

  useEffect(() => {
    if(events && events.eventToBeOpened) {
      let registered = false;
      const participants = events.eventToBeOpened.participant;
      const audiences = events.eventToBeOpened.audience;
      if(participants) {
        const index = participants.findIndex((i) => i.userObj.id === user.id);
        if(index >=0) {
          registered = true;
        }
      }
      if(audiences) {
        const index = audiences.findIndex((i) => i.userObj.id === user.id);
        if(index >=0) {
          registered = true;
        }
      }
      if(!registered) {
        registerEventByEvent(events.eventToBeOpened);
      }else {
        setEvents({...events, eventToBeOpened: null});
        handleApiError({message: 'You are already Registered for this event!'});
      }    
    }
  }, []);

  useEffect(() => {
    if(events && events.upcomingEvents) {
      setDisplayedEvents([...events.upcomingEvents]);
    }
  }, [events.upcomingEvents]);

  const registerEvent = function (i,j) {
    const eventConsidered = allEvents[i][j];
    setRegisterModalData(eventConsidered);
    if (eventConsidered.is_reg_open) {
      const user = firebase.auth().currentUser;
      if (user) {
        setIsCreateEventModalOpen(true);
      }
      else {
        setIsLoginModalOpen(true);
      }
    }
  };

  const registerEventByEvent = function (eventConsidered) {
    setEvents({...events, eventToBeOpened: eventConsidered});
    if (eventConsidered.is_reg_open) {
      const user = firebase.auth().currentUser;
      if (user) {
        setIsCreateEventModalOpen(true);
      }
      else {
        setIsLoginModalOpen(true);
      }
    }
  };

  useEffect(() => {
    if (displayedEvents && displayedEvents.length > 0) {
      const length = displayedEvents.length;
      const groupedEvents = [];
      for (let i = 0; i < length;) {
        const group = [];
        if (displayedEvents[i]) {
          group.push(displayedEvents[i]);
        }
        if(window.innerWidth<600){
          groupedEvents.push(group);
          i++;
          continue;
        }
        if (displayedEvents[i + 1]) {
          group.push(displayedEvents[i + 1]);
        }
        if (displayedEvents[i + 2]) {
          group.push(displayedEvents[i + 2]);
        }
        i = i + 3;
        groupedEvents.push(group);
      }
      setAllEvents(groupedEvents);
      if(hitEvent) {
        const eventConsidered = displayedEvents.find((i) => i.id === hitEvent);
        if(eventConsidered) {
          registerEventByEvent(eventConsidered);
        }        
      }
    }
  }, [displayedEvents]);

  const closeRegisterModal = () => {
    setIsCreateEventModalOpen(false);
  };


  return (
    <div className="parallax-section" id="events">
      <MDBContainer className="homepage-title">
        <h1>Upcoming Events</h1>
      </MDBContainer>
      <MDBContainer>
        {!allEvents || allEvents.length == 0 && (
          <h2 className="no-events">No Events Coming Up!</h2>
        )}
        {allEvents && allEvents.length > 0 && (<MDBCarousel
          activeItem={1}
          length={allEvents.length}
          slide={true} showControls={true} showIndicators={true}
          className="z-depth-1"
        >
          <MDBCarouselInner>
            {allEvents && allEvents.map((group, i) => (
              <MDBCarouselItem itemId={i + 1}>
                <MDBView>
                  <MDBRow>
                    {group && group.map((event, j) => (
                      <MDBCol md="4" sm="12">
                        {event.poster_link_small && (
                          <img
                            onClick={() => registerEvent(i,j)}
                            title="Click to Register"
                            className="d-block w-100 img-fluid carousel-img"
                            src={event.poster_link_small}
                            alt={event.name}
                          />
                        )}
                      </MDBCol>
                    ))}

                  </MDBRow>
                </MDBView>
              </MDBCarouselItem>
            ))}
          </MDBCarouselInner>
        </MDBCarousel>
        )}
      </MDBContainer>
      <MDBModal isOpen={isLoginModalOpen} centered>
        <Login setUser={setUser} setIsLoading={setIsLoading} close={() => {}} />
      </MDBModal>
      <MDBModal id="register-event-modal" isOpen={isCreateEventModalOpen} centered>
        <RegisterEvent userDetails={user} eventDetails={events.eventToBeOpened} close={closeRegisterModal} />
      </MDBModal>
    </div>
  );
}

export default Events;
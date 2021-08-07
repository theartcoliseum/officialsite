import React, { useState, useContext, useEffect } from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer, MDBRow, MDBCol, MDBModal, MDBBtn } from
  "mdbreact";
import firebase from "firebase/app";
import Login from '../../../components/Login'
import RegisterEvent from '../../RegisterEvent'
import { AuthContext } from '../../../context/AuthContext';

const Events = ({ eventlist }) => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [registerModalData, setRegisterModalData] = useState(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);

  const { user, setUser, setIsLoading } = useContext(AuthContext);


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
  }

  useEffect(() => {
    if (eventlist && eventlist.length > 0) {
      const length = eventlist.length;
      const groupedEvents = [];
      for (let i = 0; i < length;) {
        const group = [];
        if (eventlist[i]) {
          group.push(eventlist[i]);
        }
        if(window.innerWidth<600) continue;
        if (eventlist[i + 1]) {
          group.push(eventlist[i + 1]);
        }
        if (eventlist[i + 2]) {
          group.push(eventlist[i + 2]);
        }
        i = i + 3;
        groupedEvents.push(group);
      }
      setAllEvents(groupedEvents);
    }
  }, [eventlist]);


  return (
    <div className="parallax-section" id="events">
      <MDBContainer className="homepage-title">
        <h1>Upcoming Events</h1>
      </MDBContainer>
      <MDBContainer>
        {!allEvents || allEvents.length == 0 && (
          <h2 class="no-events">No Events Coming Up!</h2>
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
        <Login setUser={setUser} setIsLoading={setIsLoading} close={() => { setIsLoginModalOpen(false); }} />
      </MDBModal>
      <MDBModal id="register-event-modal" isOpen={isCreateEventModalOpen} centered>
        <RegisterEvent userDetails={user} eventDetails={registerModalData} close={() => { setIsCreateEventModalOpen(false); }} />
      </MDBModal>
    </div>
  );
}

export default Events;
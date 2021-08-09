import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBModal } from "mdbreact";

import { EventContext } from '../../context/EventContext';
import NextEvent from './NextEvent';
import EventsSummary from './EventsSummary';
import PollSummary from './PollSummary';
import UpcomingEvents from './UpcomingEvents';
import PastAttendedEvents from './PastAttendedEvents';
import RegisterEvent from "../RegisterEvent";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const [nextDate, setNextDate] = useState("");
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [registerModalData, setRegisterModalData] = useState(null);
  const { events } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    if (events && events.upcomingEvents && events.upcomingEvents.length > 0) {
      let tempEvents = events.upcomingEvents.map((event) => {
        // Format Date
        let eventD = null;
        if (event.e_date) {
          eventD = event;
        } else if (event.eventObj.e_date) {
          eventD = event.eventObj;
        }
        const formattedDate = `${eventD.e_date.toDate().toLocaleDateString()} ${eventD.e_time}`;
        // Check if the event is being participated in event
        let participant = false;
        if (event.participant) {
          const myParticipant = event.participant.findIndex((i) => i.userObj.id === user.id);
          if (myParticipant !== -1) {
            participant = true;
          }
        }
        return {
          datetime: formattedDate,
          name: event.name,
          type: event.type,
          payment_status: event.payment_enabled ? 'Paid' : 'Free',
          can_register: event.can_register,
          is_reg_open: event.is_reg_open,
          participant: participant,
          eventObj: event
        };
      });
      tempEvents = tempEvents.sort((a, b) => a.dateTime > b.dateTime);
      setUpcomingEvents(tempEvents);
      const tempDate = `${new Date(tempEvents[0].eventObj.e_date.seconds * 1000).toLocaleDateString()}T${tempEvents[0].eventObj.e_time}`;
      setNextDate(tempDate);
    }
  }, [events.upcomingEvents]);

  useEffect(() => {
    if (events && events.pastEventsParticipated && events.pastEventsParticipated.length > 0) {
      let tempEvents = events.pastEventsParticipated.map((event) => {
        let eventD = null;
        if (event.e_date) {
          eventD = event;
        } else if (event.eventObj.e_date) {
          eventD = event.eventObj;
        }
        const formattedDate = `${eventD.e_date.toDate().toLocaleDateString()} ${eventD.e_time}`;
        return {
          datetime: formattedDate,
          name: event.name,
          type: event.type,
          eventObj: event
        };
      });
      tempEvents = tempEvents.sort((a, b) => a.dateTime > b.dateTime);
      setPastEvents(tempEvents);
    }
  }, [events.pastEventsParticipated]);

  const registerEventFn = (event) => {
    setRegisterModalData(event);
    setIsCreateEventModalOpen(true);
  };

  return (
    <div className="parallax-section" id="dashboard">
      <MDBContainer>
        <h1 className="h1-responsive">My Dashboard</h1>
        <MDBRow>
          <MDBCol lg="4" md="4" className="mb-lg-0 mb-5">
            <NextEvent nextDate={nextDate} />
          </MDBCol>
          <MDBCol lg="8" md="8" className="mb-lg-0 mb-5">
            <UpcomingEvents upcomingEvents={upcomingEvents} registerEventFn={registerEventFn} />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="6" md="6" className="mb-lg-0 mb-5">
            <EventsSummary />
          </MDBCol>
          <MDBCol lg="6" md="6" className="mb-lg-0 mb-5">
            <PollSummary />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="mb-lg-0 mb-5">
            <PastAttendedEvents pastEvents={pastEvents} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBModal id="register-event-modal" isOpen={isCreateEventModalOpen} centered>
        <RegisterEvent userDetails={user} eventDetails={registerModalData} close={() => { setIsCreateEventModalOpen(false); }} />
      </MDBModal>
    </div>
  );
}

export default Dashboard;
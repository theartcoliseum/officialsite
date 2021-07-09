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

  useEffect(() => {
    if (events && events.upcomingEvents && events.upcomingEvents.length > 0) {
      let tempEvents = events.upcomingEvents.map((event) => {
        const formattedDate = new Date(event.datetime.seconds * 1000).toUTCString();
        return {
          datetime: formattedDate,
          name: event.name,
          type: event.type,
          payment_status: event.payment_enabled ? 'Paid' : 'Free',
          can_register: event.can_register,
          is_reg_open: event.is_reg_open,
          eventObj: event
        };
      });
      tempEvents = tempEvents.sort((a, b) => a.dateTime > b.dateTime);
      setUpcomingEvents(tempEvents);
      const tempDate = new Date(tempEvents[0].datetime);
      setNextDate(tempDate);
    }
  }, [events.upcomingEvents]);

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
          <MDBCol lg="4" md="4" className="mb-lg-0 mb-5">
            <EventsSummary />
          </MDBCol>
          <MDBCol lg="4" md="4" className="mb-lg-0 mb-5">
            <PollSummary />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="6" md="6" className="mb-lg-0 mb-5">
            <UpcomingEvents upcomingEvents={upcomingEvents} registerEventFn={registerEventFn} />
          </MDBCol>
          <MDBCol lg="6" md="6" className="mb-lg-0 mb-5">
            <PastAttendedEvents />
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
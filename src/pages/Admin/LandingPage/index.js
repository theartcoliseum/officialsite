import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal } from "mdbreact";
import CreateEvent from '../CreateEvent';
import UpcomingEvents from "./upcomingEvents";
import { EventContext } from '../../../context/EventContext';


const AdminLanding = () => {
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const { events } = useContext(EventContext);

    useEffect(() => {
        if (events && events.upcomingEventsWithParticipation && events.upcomingEventsWithParticipation.length > 0) {
          let tempEvents = events.upcomingEventsWithParticipation.map((event) => {
            const formattedDate = new Date(event.datetime.seconds * 1000).toUTCString();
            return {
              datetime: formattedDate,
              name: event.name,
              type: event.type,
              payment_status: event.payment_enabled ? 'Paid' : 'Free',
              eventObj: event
            };
          });
          tempEvents = tempEvents.sort((a, b) => a.dateTime > b.dateTime);
          setUpcomingEvents(tempEvents);
        }
      }, [events.upcomingEventsWithParticipation]);

    return (
        <div className="parallax-section" id="admin">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg="10" md="10" className="mb-lg-0 mb-5">
                        <h1 className="h1-responsive">Admin Dashboard</h1>
                    </MDBCol>
                    <MDBCol lg="2" md="2" className="mb-lg-0 mb-5">
                        <MDBBtn color="elegant" onClick={() => setIsCreateEventModalOpen(true)}>Create Event</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <UpcomingEvents upcomingEvents={upcomingEvents} manageEvent={() => {}} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBModal id="create-event-modal" isOpen={isCreateEventModalOpen} centered>
                <CreateEvent close={() => { setIsCreateEventModalOpen(false); }} />
            </MDBModal>
        </div>
    );
}

export default AdminLanding;
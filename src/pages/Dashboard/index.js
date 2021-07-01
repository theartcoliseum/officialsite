import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import NextEvent from './NextEvent';
import EventsSummary from './EventsSummary';
import PollSummary from './PollSummary';
import UpcomingEvents from './UpcomingEvents';
import PastAttendedEvents from './PastAttendedEvents';

const Dashboard = () => {
  const [nextDate, setNextDate] = useState("");

  useEffect(() => {
    let tempDate = new Date();
    tempDate.setDate(tempDate.getDate() + 15);
    setNextDate(tempDate);
  }, []);
  
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
            <UpcomingEvents />
          </MDBCol>
          <MDBCol lg="6" md="6" className="mb-lg-0 mb-5">
            <PastAttendedEvents />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Dashboard;
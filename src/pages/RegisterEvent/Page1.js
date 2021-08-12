import React from "react";

import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";

const Page1 = ({ handleBack, eventDetails, handleNext, userDetails }) => {

    return (
        <MDBContainer>
            <MDBRow className="text-center">
                <MDBCol>
                    <h1 className="event-name">{eventDetails.name}</h1>
                </MDBCol>
            </MDBRow>
            <h2 className="register-pg-title">Event Details</h2>
            <br/>
            <MDBRow>
                <MDBCol lg="3" md="6">
                    <span className="event-title-bold">Event Date</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                {`${eventDetails.e_date.toDate().toLocaleDateString()}`}
                </MDBCol>
                <MDBCol lg="3" md="6">
                <span className="event-title-bold">Event Time</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                    {/* {new Date(eventDetails.datetime.seconds * 1000).toUTCString()} */}
                    11:11 AM
                </MDBCol>
                
            </MDBRow>
            <MDBRow>
                <MDBCol lg="3" md="6">
                <span className="event-title-bold">Event Platform</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                    {eventDetails.type}
                </MDBCol>
                <MDBCol lg="3" md="6">
                <span className="event-title-bold">Event Payment</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                    {eventDetails.payment_enabled ? 'Paid' : 'Free'}
                </MDBCol>
            </MDBRow>
            <br/>
            <h2  className="register-pg-title">User Details</h2>
            <MDBRow className="mt-4">
                <MDBCol lg="3" md="6">
                <span className="event-title-bold">Name</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                    {userDetails.f_name} {userDetails.l_name}
                </MDBCol>
                <MDBCol lg="3" md="6">
                <span className="event-title-bold">Email</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                    {userDetails.email}
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol lg="3" md="6">
                <span className="event-title-bold">Mobile No.</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                    {userDetails.mobile}
                </MDBCol>
                <MDBCol lg="3" md="6">
                <span className="event-title-bold">City</span>
                </MDBCol>
                <MDBCol lg="3" md="6">
                    {userDetails.city}
                </MDBCol>
            </MDBRow>
            
            <MDBRow className="buttons-row">
                <MDBBtn color="elegant" disabled={true} onClick={() =>handleBack()}>Back</MDBBtn>

                <MDBBtn
                    variant="contained"
                    color="elegant"
                    onClick={() => handleNext({eventObj: eventDetails, userObj: userDetails})}
                >Next</MDBBtn>
            </MDBRow>
        </MDBContainer>
    );
}

export default Page1;
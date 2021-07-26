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
                <MDBCol>
                    <span className="event-title-bold">Event Date</span>
                </MDBCol>
                <MDBCol>
                {`${eventDetails.e_date.toDate().toLocaleDateString()}`}
                </MDBCol>
                <MDBCol>
                <span className="event-title-bold">Event Time</span>
                </MDBCol>
                <MDBCol>
                    {/* {new Date(eventDetails.datetime.seconds * 1000).toUTCString()} */}
                    11:11 AM
                </MDBCol>
                
            </MDBRow>
            <MDBRow>
                <MDBCol>
                <span className="event-title-bold">Event Platform</span>
                </MDBCol>
                <MDBCol>
                    {eventDetails.type}
                </MDBCol>
                <MDBCol>
                <span className="event-title-bold">Event Payment</span>
                </MDBCol>
                <MDBCol>
                    {eventDetails.payment_enabled ? 'Paid' : 'Free'}
                </MDBCol>
            </MDBRow>
            <br/>
            <h2  className="register-pg-title">User Details</h2>
            <MDBRow className="mt-4">
                <MDBCol>
                <span className="event-title-bold">Name</span>
                </MDBCol>
                <MDBCol>
                    {userDetails.f_name} {userDetails.l_name}
                </MDBCol>
                <MDBCol>
                <span className="event-title-bold">Email</span>
                </MDBCol>
                <MDBCol>
                    {userDetails.email}
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                <span className="event-title-bold">Mobile No.</span>
                </MDBCol>
                <MDBCol>
                    {userDetails.mobile}
                </MDBCol>
                <MDBCol>
                <span className="event-title-bold">City</span>
                </MDBCol>
                <MDBCol>
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
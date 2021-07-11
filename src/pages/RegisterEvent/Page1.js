import React from "react";

import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";

const Page1 = ({ handleBack, eventDetails, handleNext, userDetails }) => {

    return (
        <MDBContainer>
            <h2>Event Details</h2>
            <MDBRow>
                <MDBCol>
                    Event Date and Time
                </MDBCol>
                <MDBCol>
                    {new Date(eventDetails.datetime.seconds * 1000).toUTCString()}
                </MDBCol>
                <MDBCol>
                    Event Name
                </MDBCol>
                <MDBCol>
                    {eventDetails.name}
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    Event Platform
                </MDBCol>
                <MDBCol>
                    {eventDetails.type}
                </MDBCol>
                <MDBCol>
                    Event Payment
                </MDBCol>
                <MDBCol>
                    {eventDetails.payment_enabled ? 'Paid' : 'Free'}
                </MDBCol>
            </MDBRow>
            <h2>User Details</h2>
            <MDBRow>
                <MDBCol>
                    User Name
                </MDBCol>
                <MDBCol>
                    {userDetails.f_name} {userDetails.l_name}
                </MDBCol>
                <MDBCol>
                    Email
                </MDBCol>
                <MDBCol>
                    {userDetails.email}
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    Mobile
                </MDBCol>
                <MDBCol>
                    {userDetails.mobile}
                </MDBCol>
                <MDBCol>
                    City
                </MDBCol>
                <MDBCol>
                    {userDetails.city}
                </MDBCol>
            </MDBRow>
            
            <MDBRow>
                <MDBBtn color="elegant" disabled={true} onClick={() =>handleBack()}>Back</MDBBtn>

                <MDBBtn
                    variant="contained"
                    color="elegant"
                    onClick={() => handleNext()}
                >Next</MDBBtn>
            </MDBRow>
        </MDBContainer>
    );
}

export default Page1;
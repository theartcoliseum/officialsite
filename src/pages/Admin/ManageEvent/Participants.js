import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal } from "mdbreact";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { EventContext } from '../../../context/EventContext';


const ManageParticipants = ({ participants }) => {

    useEffect(() => {
        console.log(participants);
    }, [participants]);

    const { events } = useContext(EventContext);

    return (
        <div className="parallax-section" id="admin">
            <MDBContainer>
                
            </MDBContainer>
        </div>
    );
}

export default ManageParticipants;
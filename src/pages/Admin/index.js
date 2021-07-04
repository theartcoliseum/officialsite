import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

const Admin = () => {
  
  return (
    <div className="parallax-section" id="admin">
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="8" md="8" className="mb-lg-0 mb-5">
            <h1 className="h1-responsive">Admin Dashboard</h1>
          </MDBCol>
          <MDBCol lg="4" md="4" className="mb-lg-0 mb-5">
            <MDBBtn color="elegant">Create Event</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Admin;
import React from "react";
import { MDBBtn, MDBJumbotron, MDBContainer, MDBRow, MDBCol } from "mdbreact";

const About = () => {
  return (
    <div className="parallax-section" id="about">
      <MDBContainer>
        <MDBRow>
          
          <MDBCol md="6" sm="12">
            <MDBJumbotron>
              <h1 className="h1-responsive">The Art Coliseum</h1>
              <p className="lead">
                Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit
    </p>
              <hr className="my-2" />
              <p>
                Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor SitLorem Ispum Dolor SitLorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit Lorem Ispum Dolor Sit
    </p>
              <MDBBtn color="elegant" size="lg">
                Learn more
    </MDBBtn>
            </MDBJumbotron>
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>

      </MDBContainer>
    </div>
  );
}

export default About;
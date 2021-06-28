import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";

const Services = () => {
  return (<div className="parallax-section" id="services">
    <MDBContainer>
      <h1> Our Services</h1>
      <MDBRow>
        <MDBCol lg="4" md="6" sm="12" className="mb-lg-0 mb-5">
          <MDBCard>
            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <MDBCardBody>
              <MDBCardTitle>Open Mics and Other Events</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make
                up the bulk of the card&apos;s content.
          </MDBCardText>
              <MDBBtn color="elegant">Learn More</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="4" md="6" sm="12" className="mb-lg-0 mb-5">
          <MDBCard>
            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <MDBCardBody>
              <MDBCardTitle>Merchandise</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make
                up the bulk of the card&apos;s content.
          </MDBCardText>
              <MDBBtn color="elegant">Learn More</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="4" md="6" sm="12" className="mb-lg-0 mb-5">
          <MDBCard>
            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <MDBCardBody>
              <MDBCardTitle>Other Services</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make
                up the bulk of the card&apos;s content.
          </MDBCardText>
              <MDBBtn color="elegant">Learn More</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>);
}

export default Services;
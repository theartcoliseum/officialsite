import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
  "mdbreact";

const Events = () => {
  return (
    <div className="parallax-section" id="events">
      <MDBContainer>
        <h1>The Art Coliseum</h1>
        <h4>Family of Artists</h4>
      </MDBContainer>
      <MDBContainer>
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          className="z-depth-1"
          slide
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                  className="d-block w-100 img-fluid"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
                  alt="First slide"
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100 img-fluid"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                  alt="Second slide"
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                  className="d-block w-100 img-fluid"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                  alt="Third slide"
                />
              </MDBView>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
}

export default Events;
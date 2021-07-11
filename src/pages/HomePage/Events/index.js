import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer, MDBBtn } from
  "mdbreact";

const Events = ({eventlist}) => {
  return (
    <div className="parallax-section" id="events">
      <MDBContainer>
        <h1>The Art Coliseum</h1>
        <h4>Family of Artists</h4>
      </MDBContainer>
      <MDBContainer>
        <MDBCarousel
          activeItem={1}
          length={eventlist.length}
          showControls={true}
          showIndicators={true}
          className="z-depth-1"
          slide
        >
          <MDBCarouselInner>
            {eventlist && eventlist.map(({name, poster_link_big}, index) => (
              <MDBCarouselItem itemId={index + 1}>
              <MDBView>
                <img
                  className="d-block w-100 img-fluid"
                  src={poster_link_big}
                  alt={name}
                />
              </MDBView>
            </MDBCarouselItem>
            ))}
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
}

export default Events;
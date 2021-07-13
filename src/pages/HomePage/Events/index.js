import React ,{useState,useContext} from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer, MDBBtn , MDBModal } from
  "mdbreact";
import firebase from "firebase/app";
import Login from '../../../components/Login'
import RegisterEvent from '../../RegisterEvent'
import { AuthContext } from '../../../context/AuthContext';

const Events = ({eventlist}) => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [registerModalData, setRegisterModalData] = useState(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  const {user, setUser, setIsLoading, isLoading} = useContext(AuthContext);

  const registerEvent = function(index){
    const eventConsidered = eventlist[index];
    setRegisterModalData(eventConsidered);
    if(eventConsidered.is_reg_open){
      const user = firebase.auth().currentUser;
      if(user){
        setIsCreateEventModalOpen(true);
      }
      else{
        setIsLoginModalOpen(true);
      }
    }
  }
  const srcRender = function(big,small){
    if(window.innerWidth>1000){
      return big;
    }
    return small;
  }
  return (
    <div className="parallax-section" id="events">
      <MDBContainer className="homepage-title">
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
            {eventlist && eventlist.map((event, index) => (
              <MDBCarouselItem itemId={index + 1}>
              <MDBView>
                <img
                  onClick={()=>registerEvent(index)}
                  title="CLick to Register"
                  className="d-block w-100 img-fluid"
                  src={srcRender(event.poster_link_big,event.poster_link_small)}
                  alt={event.name}
                />
                {/* <button onClick={()=>registerEvent(event)}>
                  <span>Click to register</span>
                </button> */}
              </MDBView>
            </MDBCarouselItem>
            ))}
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
      <MDBModal isOpen={isLoginModalOpen} centered>
        <Login setUser={setUser} setIsLoading={setIsLoading} close={() => { setIsLoginModalOpen(false); }} />
      </MDBModal>
      <MDBModal id="register-event-modal" isOpen={isCreateEventModalOpen} centered>
        <RegisterEvent userDetails={user} eventDetails={registerModalData} close={() => { setIsCreateEventModalOpen(false); }} />
      </MDBModal>
    </div>
  );
}

export default Events;
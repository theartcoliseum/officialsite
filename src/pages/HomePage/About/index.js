import React , { useState , useEffect ,useContext} from "react";
import { MDBBtn, MDBJumbotron, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {getAboutUsData} from '../../../firebase/firebase.db';
import { AuthContext } from '../../../context/AuthContext';


const About = () => {

  const [aboutUsData,setAboutData] = useState('');
  const {setIsLoading} = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getAboutData();
  }, []);

  const getAboutData = () =>{
    getAboutUsData(successCallBackAboutUs);
  }

  function successCallBackAboutUs(data){
    setAboutData(data);
    setIsLoading(false);
  }

  return (
    <div className="parallax-section" id="about">
      <MDBContainer>
        <MDBRow>
          
          <MDBCol md="4" sm="12">
            <MDBJumbotron>
              <h1 className="h1-responsive">The Art Coliseum</h1>
              <p className="lead">{aboutUsData}</p>
              <hr className="my-2" />
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
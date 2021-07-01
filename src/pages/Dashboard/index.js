import React from "react";
import { MDBBtn, MDBJumbotron, MDBContainer } from "mdbreact";
import { useHistory, useRouteMatch } from 'react-router-dom';

const Dashboard = () => {
  let history = useHistory();
  const goToHome = () => {
    history.push('/protected');
  }
  return (
    <div className="parallax-section" id="dashboard">
      <MDBContainer>
        <MDBJumbotron>
          <h1 className="h1-responsive">About Us</h1>
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
        <span onClick={goToHome}>Go to Homepage</span>
        </MDBJumbotron>
        
      </MDBContainer>
    </div>
  );
}

export default Dashboard;
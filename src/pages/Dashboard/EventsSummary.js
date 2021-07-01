import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBCardFooter } from "mdbreact";

const EventSummary = () => {
    const [eventsChartData, setEventsChartData] = useState();

    useEffect(() => {
        setEventsChartData({
              labels: ["Performed", "Attended"],
              datasets: [
                {
                  data: [8, 12],
                  backgroundColor: ["#FDB45C", "#46BFBD"],
                  hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1"
                  ]
                }
              ]
          });
    }, []);

    return (
        <MDBCard>
            <MDBCardHeader tag="h3">
                Your Event Summary
              </MDBCardHeader>
            <MDBCardBody>
                <MDBCardText>
                <Doughnut data={eventsChartData} options={{ responsive: true }} />
                </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter>
                <MDBBtn color="elegant">Check Details</MDBBtn>
            </MDBCardFooter>
        </MDBCard>
    );
}

export default EventSummary;
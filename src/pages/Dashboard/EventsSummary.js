import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBCardFooter } from "mdbreact";

const EventSummary = ({parameters}) => {
    const [eventsChartData, setEventsChartData] = useState();

    useEffect(() => {
        const total = parameters.partCount + parameters.audienceCount;
        const participated = (parameters.partCount / total) * 100;
        const attended = (parameters.audienceCount / total) * 100;
        setEventsChartData({
              labels: ["Performed", "Attended"],
              datasets: [
                {
                  data: [participated, attended],
                  backgroundColor: ["#FDB45C", "#46BFBD"],
                  hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1"
                  ]
                }
              ]
          });
    }, [parameters]);

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
        </MDBCard>
    );
}

export default EventSummary;
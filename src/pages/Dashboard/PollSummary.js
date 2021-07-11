import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBCardFooter } from "mdbreact";

const PollSummary = () => {
    const [pastPollsChartData, setPastPollsChartData] = useState();

    useEffect(() => {
        setPastPollsChartData({
            labels: ["Good", "Very Good", "Excellent"],
            datasets: [
                {
                    data: [8, 12],
                    backgroundColor: ["#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: [
                        "#FFC870",
                        "#A8B3C5",
                        "#616774"
                    ]
                }
            ]
        });
    }, []);

    return (
        <MDBCard>
            <MDBCardHeader tag="h3">
                Your Performance Summary
              </MDBCardHeader>
            <MDBCardBody>
                <MDBCardText>
                    <Doughnut data={pastPollsChartData} options={{ responsive: true }} />
                </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter>
                <MDBBtn color="elegant">Check Details</MDBBtn>
            </MDBCardFooter>
        </MDBCard>
    );
}

export default PollSummary;
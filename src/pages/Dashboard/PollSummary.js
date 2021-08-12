import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBCardFooter } from "mdbreact";

const PollSummary = ({parameters}) => {
    const [pastPollsChartData, setPastPollsChartData] = useState();

    useEffect(() => {
        setPastPollsChartData({
            labels: ["Good", "Very Good", "Excellent"],
            datasets: [
                {
                    data: [parameters.poll_good, parameters.poll_vgood, parameters.poll_excel],
                    backgroundColor: ["#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: [
                        "#FFC870",
                        "#A8B3C5",
                        "#616774"
                    ]
                }
            ]
        });
    }, [parameters]);

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
        </MDBCard>
    );
}

export default PollSummary;
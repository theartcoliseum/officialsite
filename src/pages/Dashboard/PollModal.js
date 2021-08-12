import React, { Fragment, useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from "mdbreact";

const PollModal = ({ close, polldata }) => {
    const [pollDataState, setPollDataState] = useState({});
    const [pollChartData, setPollChartData] = useState();

    useEffect(() => {
        setPollDataState({...polldata});
        setPollChartData({
            labels: ["Good", "Very Good", "Excellent"],
            datasets: [
                {
                    data: [polldata['poll_good'], polldata['poll_vgood'], polldata['poll_excel']],
                    backgroundColor: ["#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: [
                        "#FFC870",
                        "#A8B3C5",
                        "#616774"
                    ]
                }
            ]
        });
    }, [polldata]);

    return (
        <Fragment>
            <MDBModalHeader>Poll Details</MDBModalHeader>
            <MDBModalBody >
            <Doughnut data={pollChartData} options={{ responsive: true }} />
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="elegant" outline onClick={close}>Close</MDBBtn>
            </MDBModalFooter>
        </Fragment>
    );
}

export default PollModal;
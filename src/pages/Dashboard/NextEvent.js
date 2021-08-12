import React, { useState, useEffect } from "react";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBCardFooter, MDBRow, MDBCol } from "mdbreact";

const NextEvent = ({ nextDate }) => {
    const [dateObj, setDateObj] = useState({
        days: 0, hours: 0, mins: 0, secs: 0
    });

    useEffect(() => {
        if (nextDate) {
            let myInterval = setInterval(() => {
                console.log(nextDate);
                const parts = nextDate.split('T');
                const dateParts = parts[0].split('/');
                const timeParts = parts[1].split(':');

                let d = Math.floor((new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]).getTime() - new Date().getTime()) / 1000);
                const tempObj = {};
                tempObj.days = Math.floor(d / (24 * 60 * 60));
                d = d % (24 * 60 * 60);
                tempObj.hours = Math.floor(d / (60 * 60));
                d = d % (60 * 60);
                tempObj.mins = Math.floor(d / (60));
                tempObj.secs = Math.floor(d % (60));
                setDateObj({ ...tempObj });
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };

        }
    }, [nextDate])

    return (
        <MDBCard className="next-event">
            <MDBCardHeader tag="h3">
                Next Event in:
              </MDBCardHeader>
            <MDBCardBody>
                <MDBCardText>
                    <MDBRow>
                        <MDBCol className="text-center">
                            <h1>{dateObj.days}</h1> days
                        </MDBCol>
                        <MDBCol>
                            <h1>{dateObj.hours}</h1> hours
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol className="text-center">
                            <h2>{dateObj.mins}</h2> mins
                           </MDBCol>
                        <MDBCol>

                            <h2>{dateObj.secs}</h2> secs
                        </MDBCol>
                    </MDBRow>
                </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter>
                <MDBBtn color="elegant">Check Details</MDBBtn>
            </MDBCardFooter>
        </MDBCard>
    );
}

export default NextEvent;
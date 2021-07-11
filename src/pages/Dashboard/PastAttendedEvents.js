import React from "react";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const PastAttendedEvents = ({ pastEvents }) => {
    const columns = [
        {
            label: 'Date',
            field: 'datetime',
            sort: 'asc'
        },
        {
            label: 'Event Name',
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Platform',
            field: 'type',
            sort: 'asc'
        },
        {
            label: 'Register',
            field: '',
            sort: 'asc'
        }
    ];

    return (
        <MDBCard>
            <MDBCardHeader tag="h3">
                Past Attended Events
              </MDBCardHeader>
            <MDBCardBody className="table-container">
                <MDBCardText>
                    <MDBTable btn responsive scrollY striped sorting="true">
                        <MDBTableHead columns={columns} />
                        <MDBTableBody>
                            {(!pastEvents || pastEvents.length === 0) && (
                                <tr>
                                    <td colSpan="4">
                                        No Events attended previously
                                    </td>
                                </tr>
                            )}
                            {pastEvents && pastEvents.map((event) => {
                                <tr>
                                    <td>{event.datetime}</td>
                                    <td>{event.name}</td>
                                    <td>{event.type}</td>
                                    <td><MDBBtn color="elegant" size="sm">Download Certificate</MDBBtn></td>
                                </tr>
                            })}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
}

export default PastAttendedEvents;
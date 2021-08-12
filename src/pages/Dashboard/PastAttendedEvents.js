import React, {useEffect, Fragment} from "react";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const PastAttendedEvents = ({ pastEvents }) => {

    useEffect(() => {
        console.log('Here');
        console.log(pastEvents);
    },[pastEvents]);

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
            label: 'Performance Type',
            field: '',
            sort: 'asc'
        },
        {
            label: 'Poll Details',
            field: '',
            sort: 'asc'
        },
        {
            label: 'Attendance',
            field: '',
            sort: 'asc'
        },
        {
            label: 'Download Certificate',
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
                                    <td colSpan="7">
                                        No Events attended previously
                                    </td>
                                </tr>
                            )}
                            {pastEvents && pastEvents.map((event) => (
                                <tr>
                                    <td>{event.datetime}</td>
                                    <td>{event.name}</td>
                                    <td>{event.type}</td>
                                    {event.participant && (
                                        <Fragment>
                                        <td>{event && event.participant ? event.participant.perf_type : ''}</td>
                                        <td></td>
                                        <td></td>
                                        </Fragment>
                                    )}
                                    {!event.participant && (
                                        <Fragment>
                                        <td colSpan="3">Attended as Audience</td>
                                        </Fragment>
                                    )}
                                    <td><MDBBtn color="elegant" disabled={!event.participant} size="sm">Download Certificate</MDBBtn></td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
}

export default PastAttendedEvents;
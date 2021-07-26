import React from "react";
import { useHistory } from 'react-router-dom';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBTable, MDBTableBody, MDBBtn, MDBTableHead } from "mdbreact";


const UpcomingEvents = ({ upcomingEvents }) => {
    let history = useHistory();

    const manageEvent = (eventObj) => {
        history.push({
            pathname: '/protected/admin/manage',
            state: {
                event: JSON.stringify(eventObj)
            }
        });
    }

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
            label: 'Paid/Unpaid',
            field: 'payment_status',
            sort: 'asc'
        },
        {
            label: 'Manage Event',
            field: '',
            sort: 'asc'
        }
    ];

    return (
        <MDBCard>
            <MDBCardHeader tag="h3">
                Upcoming Events
              </MDBCardHeader>
            <MDBCardBody className="table-container">
                <MDBCardText>
                    <MDBTable btn responsive scrollY striped sorting="true">
                        <MDBTableHead columns={columns} />
                        <MDBTableBody>
                            {(!upcomingEvents || upcomingEvents.length === 0) && (
                                <tr>
                                    <td colSpan="5">
                                        No Upcoming Events
                                    </td>
                                </tr>
                            )}
                            {upcomingEvents && upcomingEvents.map((event) => (
                                <tr>
                                    <td>{event.datetime}</td>
                                    <td>{event.name}</td>
                                    <td>{event.type}</td>
                                    <td>{event.payment_status}</td>
                            <td><MDBBtn color="elegant" size="sm" onClick={() => {manageEvent(event.eventObj)}}>Manage Event</MDBBtn></td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
}

export default UpcomingEvents;
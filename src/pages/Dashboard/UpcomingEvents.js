import React from "react";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const UpcomingEvents = () => {
    const columns = [
        {
            label: 'Date',
            field: 'date',
            sort: 'asc'
        },
        {
            label: 'Event Name',
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Platform',
            field: 'platform',
            sort: 'asc'
        },
        {
            label: 'Register',
            field: 'register',
            sort: 'asc'
        }
    ];

    const rows_outline_btn = [
        {
            'date': '16-07-2021',
            'name': 'Virtual Open Mic Even',
            'platform': 'Zoom',
            'register': <MDBBtn color="elegant" size="sm">Register</MDBBtn>
        },
        {
            'date': '08-07-2021',
            'name': 'Facebook Live',
            'platform': 'Facebook',
            'register': <MDBBtn color="elegant" size="sm">View Details</MDBBtn>
        },
        {
            'date': '07-07-2021',
            'name': 'Instagram Live',
            'platform': 'Instagram',
            'register': <MDBBtn color="elegant" size="sm">View Details</MDBBtn>
        },
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
                        <MDBTableBody rows={rows_outline_btn} />
                    </MDBTable>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
}

export default UpcomingEvents;
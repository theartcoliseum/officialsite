import React from "react";
import { MDBBtn, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const PastAttendedEvents = () => {
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
            'date': '16-06-2021',
            'name': 'Virtual Open Mic Even',
            'platform': 'Zoom',
            'register': <MDBBtn color="elegant" size="sm">Download Certificate</MDBBtn>
        },
        {
            'date': '01-06-2021',
            'name': 'Virtual Open Mic Even',
            'platform': 'Zoom',
            'register': <MDBBtn color="elegant" size="sm">Download Certificate</MDBBtn>
        },
        {
            'date': '16-05-2021',
            'name': 'Virtual Open Mic Even',
            'platform': 'Zoom',
            'register': <MDBBtn color="elegant" size="sm">Download Certificate</MDBBtn>
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
                        <MDBTableBody rows={rows_outline_btn} />
                    </MDBTable>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
}

export default PastAttendedEvents;
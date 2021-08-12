import React, {Fragment, useState} from "react";
import { MDBBtn, MDBCard, MDBCardHeader, MDBIcon, MDBCardBody, MDBCardText, MDBTable,MDBModal, MDBTableBody, MDBTableHead } from "mdbreact";
import PollModal from './PollModal';
import generateCertificate from '../../util/PrintHandler';

const PastAttendedEvents = ({ pastEvents }) => {
    const [isPollModalOpen, setIsPollModalOpen] = useState(false);
    const [pollData, setPollData] = useState({});

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
            label: 'Attendance',
            field: '',
            sort: 'asc'
        },
        {
            label: 'Poll Details',
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
                                        <td>{event && event.participant ? event.participant.attendance : 'Not yet Updated'}</td>
                                        <td>
                                        <MDBBtn
                                        className="poll-btn"
                                        variant="contained"
                                        color="elegant"
                                        onClick={() => { setPollData({ id: event.participant.id, poll_good: event.participant.poll_good, poll_vgood: event.participant.poll_vgood, poll_excel: event.participant.poll_excel }); setIsPollModalOpen(true) }}
                                    >
                                        <MDBIcon icon="poll" className="ml-1" />
                                    </MDBBtn>
                                        </td>
                                        </Fragment>
                                    )}
                                    {!event.participant && (
                                        <Fragment>
                                        <td colSpan="3">Attended as Audience</td>
                                        </Fragment>
                                    )}
                                    <td><MDBBtn color="elegant" onClick={() => {generateCertificate(event)}} disabled={!event.participant || !event.participant.attendance || event.participant.attendance === 'N'} size="sm">Download Certificate</MDBBtn></td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardText>
            </MDBCardBody>
            <MDBModal id="poll-modal" isOpen={isPollModalOpen} centered>
                <PollModal polldata={pollData} close={() => { setIsPollModalOpen(false); }} />
            </MDBModal>
            <div id="certificate-test"></div>
        </MDBCard>
    );
}

export default PastAttendedEvents;
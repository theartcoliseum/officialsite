import React, { useState, useEffect, useContext } from "react";
import { MDBContainer } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBInput } from "mdbreact";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { updateParticipationList } from '../../../firebase/firebase.db';
import { EventContext } from '../../../context/EventContext';
import { AuthContext } from "../../../context/AuthContext";


const ManageParticipants = ({ participants }) => {
    const [participantsDetails, setParticipantDetails] = useState([]);
    const [finalList, setFinalList] = useState([]);
    const { events, setEvents } = useContext(EventContext);
    const { setIsLoading } = useContext(AuthContext);

    useEffect(() => {
        if (participants) {
            const refinedParticipants = participants.map((i) => {
                const posn_no = i.posn_no || Infinity;
                return {
                    ...i,
                    posn_no
                };
            });
            setParticipantDetails(refinedParticipants);
        }
    }, [participants]);

    const handleTextBox = (val, label, participant) => {
        const tempParticipants = [...participantsDetails];
        const myParticipantIndex = tempParticipants.findIndex((i) => i.id === participant.id);
        const myParticipant = tempParticipants[myParticipantIndex];
        tempParticipants.splice(myParticipantIndex, 1);
        myParticipant[label] = val;
        setParticipantDetails([...tempParticipants, myParticipant]);
    };

    const createFinalList = (val, label, participant) => {
        handleTextBox(val, label, participant);
        let posn = 0;
        if(!finalList || finalList.length === 0) {
            posn = 1;
        } else {
            posn = finalList[finalList.length - 1].posn_no + 1;
        }
        const tempFinalList = [...finalList, {...participant, posn_no: posn}].sort((a,b) => a.posn_no > b.posn_no);
        setFinalList([...tempFinalList]);
    }

    const filterParticipants = () => {
        let tempParticipants = participantsDetails.map((i) => {
            let status;
            if(i.rejected) {
                status = 'REJECTED';
            } else if(i.audition_accepted) {
                status = 'AUDITION_ACCEPTED'
            } else {
                status = 'REGISTERED'
            }
            return {
                ...i,
                status: status
            };
        });
        tempParticipants = tempParticipants.filter((i) => i.status === 'AUDITION_ACCEPED');
        setParticipantDetails(tempParticipants);
    };

    const saveParticipants = () => {
        setIsLoading(true);
        const apiParticipantsDetails = participantsDetails.map((i) => {
            let status;
            if(i.rejected) {
                status = 'REJECTED';
            } else if(i.audition_accepted) {
                status = 'AUDITION_ACCEPTED'
            } else {
                status = 'REGISTERED'
            }
            delete i.callback;
            delete i.city;
            delete i.email;
            delete i.f_name;
            delete i.l_name;
            delete i.mobile;
            delete i.roles;
            return {
                ...i,
                audition_accepted: i.audition_accepted || false,
                dates: {
                    registeredDate: i.dates.registeredDate
                },
                status: status
            };
        });
        updateParticipationList(apiParticipantsDetails, (list) => {
            const eventId = list[0].eventObj.id;
            // Update Context
            const upcomingEvents = [...events.upcomingEvents];
            const index = upcomingEvents.findIndex((i) => i.id === eventId);
            upcomingEvents[index].participant = list;
            setEvents({...events, upcomingEvents});
            setIsLoading(false);
        })
    };

    const columns = [
        {
            label: 'Order of performance',
            field: 'order',
            sort: 'asc'
        },
        {
            label: 'Registration Date',
            field: 'datetime',
            sort: 'asc'
        },
        {
            label: 'Participant Name',
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Participation Type',
            field: 'perf_type',
            sort: 'asc'
        },
        {
            label: 'Audition Clip',
            field: 'type',
            sort: 'asc'
        },
        {
            label: 'Accept Audition',
            field: 'audition_status',
            sort: 'asc'
        },
        {
            label: 'Reject Candidate',
            field: 'rejected_status',
            sort: 'asc'
        },
        {
            label: 'Rejection Reason',
            field: 'rejection_reason',
            sort: 'asc'
        },
        {
            label: 'Attendance',
            field: 'attendance',
            sort: 'asc'
        }
    ];

    return (
        <div id="participant">
            <MDBContainer>
            {/* <MDBBtn
                    variant="contained"
                    color="elegant"
                    onClick={filterParticipants}
                >
                    Filter Accepted Participants
                        </MDBBtn> */}
                <MDBTable btn responsive scrollY striped sorting="true">
                    <MDBTableHead columns={columns} />
                    <MDBTableBody>
                        {(!participantsDetails || participantsDetails.length === 0) && (
                            <tr>
                                <td colSpan="6">
                                    No participants Registered for this event
                                    </td>
                            </tr>
                        )}
                        {participantsDetails && participantsDetails.map((user) => (
                            <tr>
                                <td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                disabled={!user.audition_accepted || user.status === 'REJECTED'}
                                                checked={user.posn}
                                                onChange={(e) => createFinalList(e.target.checked, 'posn', user)}
                                            />
                                        }
                                    />
                                </td>
                                <td>{new Date(user.dates.registeredDate.seconds * 1000).toLocaleDateString()} {new Date(user.dates.registeredDate.seconds * 1000).toLocaleTimeString()}</td>
                                <td>{user.f_name} {user.l_name}</td>
                                <td>{user.perf_type}</td>
                                <td>
                                    {user.audition.includes('firebasestorage.googleapis.com') ?
                                        <audio controls>
                                            <source src={user.audition} />
                                    Your browser does not support the audio tag.
                                    </audio>
                                        :
                                        <Button href={user.audition} target="blank" color="primary">
                                            Audition
                                    </Button>
                                    }
                                </td>
                                <td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={user.audition_accepted}
                                                onChange={(e) => handleTextBox(e.target.checked, 'audition_accepted', user)}
                                            />
                                        }
                                    />
                                </td>
                                <td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={user.rejected}
                                                onChange={(e) => handleTextBox(e.target.checked, 'rejected', user)}
                                            />
                                        }
                                    />
                                </td>
                                <td>
                                    <MDBInput disabled={!user.rejected} type="text" onChange={(e) => { user.rejectionReason = e.target.value }} />
                                </td>
                                <td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={user.attendance}
                                                onChange={(e) => handleTextBox(e.target.checked, 'attendance', user)}
                                            />
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
                <MDBBtn
                    variant="contained"
                    color="elegant"
                    onClick={saveParticipants}
                >
                    Save
                        </MDBBtn>
            </MDBContainer>
        </div>
    );
}

export default ManageParticipants;
import React, { useState, useEffect, useContext } from "react";
import { MDBContainer } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon, MDBBtn, MDBInput, MDBModal } from "mdbreact";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { updateParticipationList } from '../../../firebase/firebase.db';
import { EventContext } from '../../../context/EventContext';
import { AuthContext } from "../../../context/AuthContext";
import { useHistory } from 'react-router-dom';
import ReactExport from "react-export-excel";
import XLSX from 'xlsx';
import PollModal from './PollModal';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const ManageParticipants = ({ participants, mode }) => {
    const [participantsDetails, setParticipantDetails] = useState([]);
    const [finalList, setFinalList] = useState([]);
    const [isPollModalOpen, setIsPollModalOpen] = useState(false);
    const [pollData, setPollData] = useState({});
    const { events, setEvents } = useContext(EventContext);
    const { setIsLoading } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (participants) {
            let refinedParticipants = participants.map((i) => {
                const posn_no = (i.posn_no && i.posn_no < 100) ? i.posn_no : Math.floor(Math.random() * 10000) + 1;
                const posn = (i.posn_no && i.posn_no < 100) ? true : false;
                return {
                    ...i,
                    posn_no,
                    posn
                };
            });
            if (mode === 'past') {
                //refinedParticipants = refinedParticipants.filter((i) => i.status === 'AUDITION_ACCEPTED');
                const tempFinalList = refinedParticipants.map((participant) => {
                    return {
                        id: participant.id,
                        posn_no: participant.posn,
                        reg_date: `${new Date(participant.dates.registeredDate.seconds * 1000).toLocaleDateString()} ${new Date(participant.dates.registeredDate.seconds * 1000).toLocaleTimeString()}`,
                        name: `${participant.userObj.f_name} ${participant.userObj.l_name}`,
                        perf_type: participant.perf_type,
                        status: participant.status,
                        attendance: participant.attendance || 'N',
                        poll_good: participant.poll_good || 0,
                        poll_vgood: participant.poll_vgood || 0,
                        poll_excel: participant.poll_excel || 0,
                    };
                });
                setFinalList(tempFinalList);

            };
            setParticipantDetails(refinedParticipants);
        }
    }, [participants]);

    const handleTextBox = (val, label, participant) => {
        const tempParticipants = [...participantsDetails];
        const myParticipantIndex = tempParticipants.findIndex((i) => i.id === participant.id);
        tempParticipants[myParticipantIndex][label] = val;
        setParticipantDetails([...tempParticipants]);
    };

    const createFinalList = (val, label, participant) => {
        // TBD load the initial list from DB into final list
        // This list will be downloaded as an excel
        let posn = 0;
        let tempFinalList = [...finalList];
        if (val) {
            if (!finalList || finalList.length === 0) {
                posn = 1;
            } else {
                posn = finalList[finalList.length - 1].posn_no + 1;
            }
            let status;
            if (participant.rejected) {
                status = 'REJECTED';
            } else if (participant.audition_accepted) {
                status = 'AUDITION_ACCEPTED'
            } else {
                status = 'REGISTERED'
            }
            const partFormatted = {
                id: participant.id,
                posn_no: posn,
                reg_date: `${new Date(participant.dates.registeredDate.seconds * 1000).toLocaleDateString()} ${new Date(participant.dates.registeredDate.seconds * 1000).toLocaleTimeString()}`,
                name: `${participant.userObj.f_name} ${participant.userObj.l_name}`,
                perf_type: participant.perf_type,
                status: status,
                attendance: participant.attendance || 'N',
                poll_good: participant.poll_good || 0,
                poll_vgood: participant.poll_vgood || 0,
                poll_excel: participant.poll_excel || 0,
            }
            tempFinalList = [...tempFinalList, partFormatted];
        } else {
            posn = Math.floor(Math.random() * 10000) + 1;
            const index = tempFinalList.findIndex((i) => i.id === participant.id);
            tempFinalList.splice(index, 1);
        }
        tempFinalList = tempFinalList.sort((a, b) => a.posn_no > b.posn_no);
        setFinalList([...tempFinalList]);
        // This list will be displayed on the table
        let tempParticipants = [...participantsDetails];
        const myParticipantIndex = tempParticipants.findIndex((i) => i.id === participant.id);
        tempParticipants[myParticipantIndex][label] = val;
        tempParticipants[myParticipantIndex].posn_no = posn;
        tempParticipants = tempParticipants.sort((a, b) => {
            if (a.posn_no < b.posn_no) {
                return -1;
            }
            if (a.posn_no > b.posn_no) {
                return 1;
            }
            return 0;
        });
        setParticipantDetails([...tempParticipants]);
    }

    const filterParticipants = () => {
        let tempParticipants = participantsDetails.map((i) => {
            let status;
            if (i.rejected) {
                status = 'REJECTED';
            } else if (i.audition_accepted) {
                status = 'AUDITION_ACCEPTED'
            } else {
                status = 'REGISTERED'
            }
            return {
                ...i,
                status: status
            };
        });
        tempParticipants = tempParticipants.filter((i) => i.status === 'AUDITION_ACCEPTED' && i.status !== 'REGISTERED');
        setParticipantDetails(tempParticipants);
    };

    const saveParticipants = () => {
        setIsLoading(true);
        const apiParticipantsDetails = participantsDetails.map((i) => {
            let status;
            if (i.rejected) {
                status = 'REJECTED';
            } else if (i.audition_accepted) {
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
            if (mode !== 'past') {
                const upcomingEvents = [...events.upcomingEvents];
                const index = upcomingEvents.findIndex((i) => i.id === eventId);
                upcomingEvents[index].participant = list;
                setEvents({ ...events, upcomingEvents });
            } else {
                const pastEvents = [...events.pastAllEvents];
                const index = pastEvents.findIndex((i) => i.id === eventId);
                pastEvents[index].participant = list;
                setEvents({ ...events, pastAllEvents: pastEvents });
            }

            setIsLoading(false);
            history.push('/protected/admin');
        })
    };

    const updatePollData = (id, ...data) => {
        const tempParticipants = [...participantsDetails];
        const index = tempParticipants.findIndex((i) => i.id === id);
        tempParticipants[index] = { ...tempParticipants[index], ...data };
        setParticipantDetails([...tempParticipants]);
    };

    const updateParticipantsPolls = (excelRows) => {
        const partsToBeUpdated = [];
        excelRows.forEach((i) => {
            const actual = participantsDetails.find((j) => j.id === i['ID'])
            if (actual) {
                actual.attendance = i['Attendance'];
                actual.poll_good = i['Poll%(GOOD)'];
                actual.poll_vgood = i['Poll%(VERY GOOD)'];
                actual.poll_excel = i['Poll%(EXCELLENT)'];
                partsToBeUpdated.push(actual);
            }
        });
        setParticipantDetails([...partsToBeUpdated]);
        setIsLoading(false);
    };

    const uploadExcel = (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = (e) => {
                    processExcel(reader.result);
                };
                reader.readAsBinaryString(file);
            }
        } else {
            console.log("This browser does not support HTML5.");
        }
    }

    function processExcel(data) {
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheet = workbook.SheetNames[0];
        const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        updateParticipantsPolls(excelRows);
    }

    return (
        <div id="participant">
            <MDBContainer>
                <div className="button-row">
                    {mode !== 'past' && (<MDBBtn
                        variant="contained"
                        color="elegant"
                        onClick={filterParticipants}
                    >
                        Filter Accepted Participants
                    </MDBBtn>)}
                    <ExcelFile element={<MDBBtn
                        variant="contained"
                        color="elegant"
                    >
                        Download Excel
                </MDBBtn>}>
                        <ExcelSheet data={finalList} name="Participants">
                            <ExcelColumn label="ID" value="id" />
                            <ExcelColumn label="Order" value="posn_no" />
                            <ExcelColumn label="Registration Date" value="reg_date" />
                            <ExcelColumn label="Name" value="name" />
                            <ExcelColumn label="Performance Type" value="perf_type" />
                            <ExcelColumn label="Status" value="status" />
                            <ExcelColumn label="Attendance" value="attendance" />
                            <ExcelColumn label="Poll%(GOOD)" value="poll_good" />
                            <ExcelColumn label="Poll%(VERY GOOD)" value="poll_vgood" />
                            <ExcelColumn label="Poll%(EXCELLENT)" value="poll_excel" />
                        </ExcelSheet>
                    </ExcelFile>
                    {mode === 'past' && (<div className="upload-btn-wrapper">
                        <MDBBtn
                            variant="contained"
                            color="elegant"
                        >
                            Upload Excel with Poll Details
                    </MDBBtn>
                        <input type="file" name="myfile" onChange={(e) => uploadExcel(e)} />
                    </div>)}
                </div>
                <MDBTable btn responsive striped sorting="true">
                    <MDBTableHead>
                        <tr>
                            {mode !== 'past' && (<th>Order of performance</th>)}
                            <th>Registration Date</th>
                            <th>Participant Name</th>
                            <th>Participation Type</th>
                            {mode !== 'past' && (<th>Audition Clip</th>)}
                            {mode !== 'past' && (<th>Accept Audition</th>)}
                            {mode !== 'past' && (<th>Reject Candidate</th>)}
                            {mode !== 'past' && (<th>Rejection Reason</th>)}
                            {mode !== 'past' && (<th>Payment Type</th>)}
                            {mode !== 'past' && (<th>Payment Reciept</th>)}
                            {mode === 'past' && (<th>Attendance</th>)}
                            {mode === 'past' && (<th>Poll Details</th>)}
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {(!participantsDetails || participantsDetails.length === 0) && (
                            <tr>
                                <td colSpan="6">
                                    No participants Registered for this event
                                    </td>
                            </tr>
                        )}
                        {participantsDetails && participantsDetails.map((user, index) => (
                            <tr key={user.posn_no}>
                                {mode !== 'past' && (<td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                disabled={(!user.audition_accepted || user.status === 'REJECTED' || user.rejected)}
                                                checked={user.posn}
                                                onChange={(e) => createFinalList(e.target.checked, 'posn', user)}
                                            />
                                        }
                                    />
                                </td>)}
                                <td>{new Date(user.dates.registeredDate.seconds * 1000).toLocaleDateString()} {new Date(user.dates.registeredDate.seconds * 1000).toLocaleTimeString()}</td>
                                <td>{user.userObj.f_name} {user.userObj.l_name}</td>
                                <td>{user.perf_type}</td>
                                {mode !== 'past' && (<td>
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
                                </td>)}
                                {mode !== 'past' && (<td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={user.audition_accepted}
                                                onChange={(e) => handleTextBox(e.target.checked, 'audition_accepted', user)}
                                            />
                                        }
                                    />
                                </td>)}
                                {mode !== 'past' && (<td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={user.rejected}
                                                onChange={(e) => handleTextBox(e.target.checked, 'rejected', user)}
                                            />
                                        }
                                    />
                                </td>)}
                                {mode !== 'past' && (<td>
                                    <MDBInput disabled={!user.rejected} type="text" onChange={(e) => { user.rejectionReason = e.target.value }} />
                                </td>)}
                                {mode !== 'past' && (<td>
                                    {(user.eventObj.payment_enabled) ? (user.payment_type || 'Online') : 'Free Event'}
                                </td>)}
                                {mode !== 'past' && (<td>
                                    {(user.eventObj.payment_enabled) ? (user.payment_link ? <Button href={user.payment_link} target="blank" color="primary">
                                        View Reciept
                                    </Button> : '') : 'Free Event'}
                                </td>)}
                                {mode === 'past' && (<td>
                                    <MDBInput type="text" onChange={(e) => { user.attendance = e.target.value }} value={user.attendance} />
                                </td>)}
                                {mode === 'past' && (<td>
                                    <MDBBtn
                                        className="poll-btn"
                                        variant="contained"
                                        color="elegant"
                                        onClick={() => { setPollData({ id: user.id, poll_good: user.poll_good, poll_vgood: user.poll_vgood, poll_excel: user.poll_excel }); setIsPollModalOpen(true) }}
                                    >
                                        <MDBIcon icon="poll" className="ml-1" />
                                    </MDBBtn>
                                </td>)}
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
            <MDBModal id="poll-modal" isOpen={isPollModalOpen} centered>
                <PollModal polldata={pollData} updatePollData={updatePollData} close={() => { setIsPollModalOpen(false); }} />
            </MDBModal>
        </div>
    );
}

export default ManageParticipants;
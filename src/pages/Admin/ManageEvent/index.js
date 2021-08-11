import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Paper, Tabs, Tab } from '@material-ui/core';
import EventDetails from "./EventDetails";
import ManageParticipants from "./Participants";
import AudienceList from "./Audience";

const ManageEvent = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const [mode, setMode] = useState('');
    const history = useHistory();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (history && history.location && history.location.state && !eventDetails) {
            // divide date time into e_date and e_time
            const event = JSON.parse(history.location.state.event);
            const mode = history.location.state.type;
            setMode(mode);
            setEventDetails({ ...event });
        }
    }, [history]);

    return (
        <div className="parallax-section" id="manage">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg="10" md="10" className="mb-lg-0 mb-5">
                        <h1 className="h1-responsive">Manage Event</h1>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol lg="12" md="12" className="mb-lg-0 mb-5">
                        <Paper elevation={3} className="form-paper">
                            <Tabs
                                value={value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleChange}
                            >
                                <Tab label="Event Details" />
                                <Tab label="Participants" />
                                <Tab label="Audience" />
                            </Tabs>
                            {value === 0 && <div>
                                <EventDetails eventDetails={eventDetails} mode={mode} />
                            </div>}
                            {value === 1 && <div>
                                <ManageParticipants participants={eventDetails.participant} mode={mode} />
                            </div>}
                            {value === 2 && <div>
                                <AudienceList audiencelist={eventDetails.audience} />
                            </div>}
                        </Paper>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default ManageEvent;
import React, { Fragment, useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';


import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from "mdbreact";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

import { createEvent } from '../../../firebase/firebase.db';
import { EventContext } from '../../../context/EventContext';
import { AuthContext } from "../../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 10,
    },
    button: {
        marginRight: 10,
    },
    instructions: {
        marginTop: 2,
        marginBottom: 5,
    },
}));

function getSteps() {
    return [{ title: 'Event Details', optional: false },
    { title: 'Terms and Conditions', optional: true },
    { title: 'Payment Details', optional: true }];
}

const CreateEvent = ({ close }) => {

    const [createEventForm, setCreateEventForm] = useState({});
    const { events, setEvents } = useContext(EventContext);
    const { setIsLoading } = useContext(AuthContext);
    // Stepper Code
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = (res) => {
        setCreateEventForm({ ...createEventForm, ...res });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (res) => {
        setCreateEventForm({ ...createEventForm, ...res });
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = (res) => {
        setIsLoading(true);
        const { callback, e_date, e_time, ...finalValues } = { ...createEventForm, ...res };
        // Handling Date
        let d = new Date(e_date);
        if(d instanceof Date) {
            d = d.toLocaleDateString();
        } else {
            d = e_date._i;
        }

        // Handling Time
        let t = new Date(e_time);
        if(t instanceof Date) {
            t = t.toLocaleTimeString();
        } else {
            t = new Date(e_time._i).toLocaleTimeString();
        }
        createEvent({ e_date: d, e_time: t, ...finalValues }, (createdEvent) => {
            const upcoming = [...events.upcomingEvents, createdEvent];
            setEvents({ ...events, upcomingEvents: upcoming });
            setIsLoading(false);
        });

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Page1 handleNext={handleNext} handleBack={handleBack} formData={createEventForm} />;
            case 1:
                return <Page2 handleNext={handleNext} handleBack={handleBack} formData={createEventForm} />;
            case 2:
                return <Page3 handleNext={handleFinish} handleBack={handleBack} formData={createEventForm} />;
            default:
                return 'Unknown step';
        }
    }
    // Stepper Code

    return (
        <Fragment>
            <MDBModalHeader>Create Event</MDBModalHeader>
            <MDBModalBody >
                <Stepper activeStep={activeStep}>
                    {steps.map(({ title, optional }, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={title} {...stepProps}>
                                <StepLabel {...labelProps}>{title}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className="stepper-body">
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                Event Created Successfully!
            </Typography>
                        </div>
                    ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            </div>
                        )}
                </div>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="elegant" outline onClick={close}>Close</MDBBtn>
            </MDBModalFooter>
        </Fragment>
    );
}

export default CreateEvent;
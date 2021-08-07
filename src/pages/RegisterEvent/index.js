import React, { Fragment, useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';


import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBCol } from "mdbreact";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

import { createParticipation, createAudience } from '../../firebase/firebase.db';
import { EventContext } from '../../context/EventContext';
import { AuthContext } from "../../context/AuthContext";
import logo from '../../assets/images/logo.png';
import AudienceReg from "./AudienceReg";

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
    { title: 'Terms and Conditions', optional: false },
    { title: 'Audition', optional: false }];
}

const RegisterEvent = ({ close, eventDetails, userDetails }) => {

    const [createEventForm, setCreateEventForm] = useState({
        event: `/events/${eventDetails.id}`,
        user: `/users/${userDetails.id}`,
    });
    const { events, setEvents } = useContext(EventContext);
    const { setIsLoading } = useContext(AuthContext);
    const [regType, setRegType] = useState('');
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

    const makePayment = (eventDetails) => {
        var options = {
            "key": "rzp_test_l7BtPBEMOLgFoR", // Enter the Key ID generated from the Dashboard
            "amount": parseInt(eventDetails.eventObj.part_amt) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "The Art Coliseum",
            "description": "Test Transaction",
            "image": logo,
            // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                // CALL CREATE PARTICIPATION HERE
                createParticipationCall(eventDetails, response.razorpay_payment_id);
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    }

    const createParticipationCall = (eventDetails, payment_id) => {
        const participationObj = {
            ...eventDetails,
            payment_id: payment_id || '',
            eventObj: {
                id: eventDetails.eventObj.id,
                name: eventDetails.eventObj.name,
                payment_enabled: eventDetails.eventObj.payment_enabled,
                part_amt: eventDetails.eventObj.part_amt,
                is_reg_open: eventDetails.eventObj.is_reg_open,
                emeeting_link: eventDetails.eventObj.emeeting_link,
                can_register: eventDetails.eventObj.can_register,
                e_time: eventDetails.eventObj.e_time,
                e_date: eventDetails.eventObj.e_date,
            }

        };

        createParticipation(participationObj, (registration) => {
            const event = { ...eventDetails, participation: registration };
            const upcomingEvents = [...events.upcomingEvents];
            const eventIndex = upcomingEvents.findIndex((i) => i.id === event.id);
            upcomingEvents.splice(eventIndex, 1);
            upcomingEvents.push(event);
            const upcomingEventsWithParticipation = [...events.upcomingEventsWithParticipation];
            const eventIndex1 = upcomingEventsWithParticipation.findIndex((i) => i.id === event.id);
            upcomingEventsWithParticipation.splice(eventIndex1, 1);
            upcomingEventsWithParticipation.push(event);
            setEvents({ ...events, upcomingEvents: upcomingEvents, upcomingEventsWithParticipation: upcomingEventsWithParticipation });
            setIsLoading(false);
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleFinish = (res) => {
        setIsLoading(true);
        const eventDetails = { ...createEventForm, ...res };
        // const eventId= eventDetails.event.split('/')[2];
        // const userId= eventDetails.user.split('/')[2];
        // const order_id = `order_${userId}`;
        // Payment Happens Here
        if (eventDetails.eventObj.payment_enabled) {
            makePayment(eventDetails);
        } else {
            createParticipationCall(eventDetails);
        }
    };

    const createAudienceCall = (eventDetails, payment_id) =>{
        const audienceObj = {
            ...eventDetails,
            event: `/events/${eventDetails.eventObj.id}`,
            user: `/users/${eventDetails.userObj.id}`,
            payment_id: payment_id || '',
            eventObj: {
                id: eventDetails.eventObj.id,
                name: eventDetails.eventObj.name,
                payment_enabled: eventDetails.eventObj.payment_enabled,
                part_amt: eventDetails.eventObj.part_amt,
                is_reg_open: eventDetails.eventObj.is_reg_open,
                emeeting_link: eventDetails.eventObj.emeeting_link,
                can_register: eventDetails.eventObj.can_register,
                e_time: eventDetails.eventObj.e_time,
                e_date: eventDetails.eventObj.e_date,
            }

        };

        createAudience(audienceObj, (registration) => {
            // Update Context Here
            console.log(registration);
            const eventId = registration.eventObj.id;
            const upcomingEvents = [...events.upcomingEvents];
            const eventIndex = upcomingEvents.findIndex((i) => i.id === eventId);
            const event = upcomingEvents[eventIndex];
            if(event.audience) {
                event.audience.push(registration);
            } else {
                event.audience = [registration];
            }
            upcomingEvents.splice(eventIndex, 1);
            upcomingEvents.push(event);

            const upcomingEventsWithParticipation = [...events.upcomingEventsWithParticipation];
            const eventIndex1 = upcomingEventsWithParticipation.findIndex((i) => i.id === eventId);
            if(eventIndex1 !== -1) {
                const event1 = upcomingEventsWithParticipation[eventIndex1];
                if(event1.audience) {
                    event1.audience.push(registration);
                } else {
                    event1.audience = [registration];
                }
                upcomingEventsWithParticipation.splice(eventIndex1, 1);
                upcomingEventsWithParticipation.push(event1);
            } else{
                upcomingEventsWithParticipation.push(event);
            }
            
            setEvents({ ...events, upcomingEvents: upcomingEvents, upcomingEventsWithParticipation: upcomingEventsWithParticipation });
            setIsLoading(false);
            close();
        });
    };

    const makePaymentAudience = (res) => {
        var options = {
            "key": "rzp_test_l7BtPBEMOLgFoR", // Enter the Key ID generated from the Dashboard
            "amount": parseInt(res.eventObj.audience_amt) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "The Art Coliseum",
            "description": "Test Transaction",
            "image": logo,
            // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                // CALL CREATE PARTICIPATION HERE
                createAudienceCall(res, response.razorpay_payment_id);
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    };

    const handleSubmitAudienceRegistration = (res) => {
        setIsLoading(true);
        if (res.eventObj.payment_enabled) {
            makePaymentAudience(res);
        } else {
            createAudienceCall(res);
        }
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Page1 eventDetails={eventDetails} userDetails={userDetails} handleNext={handleNext} handleBack={handleBack} formData={createEventForm} />;
            case 1:
                return <Page2 eventDetails={eventDetails} handleNext={handleNext} handleBack={handleBack} formData={createEventForm} />;
            case 2:
                return <Page3 handleNext={handleFinish} handleBack={handleBack} formData={createEventForm} />;
            default:
                return 'Unknown step';
        }
    }
    // Stepper Code

    return (
        <Fragment>
            <MDBModalHeader>Register for Participation</MDBModalHeader>
            <MDBModalBody >
                {!regType && (<Fragment>
                <MDBRow>
                        <MDBCol>
                            <FormControl component="fieldset">
                                <RadioGroup name="regType" value={regType} onChange={(e) => {console.log(e.target.value);setRegType(e.target.value)}}>
                                    <FormControlLabel value="Participant" control={<Radio />} label="Participant" />
                                    <FormControlLabel value="Audience" control={<Radio />} label="Audience" />
                                </RadioGroup>
                            </FormControl>
                        </MDBCol>
                    </MDBRow>
                </Fragment>)}
                {regType && regType==='Audience' && (<Fragment>
                    <AudienceReg eventDetails={eventDetails} userDetails={userDetails} handleSubmit={handleSubmitAudienceRegistration} />
                </Fragment>)}
                {regType && regType==='Participant' && (<Fragment>
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
                                    Event Registered Successfully!
            </Typography>
                            </div>
                        ) : (
                                <div>
                                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                </div>
                            )}
                    </div>
                </Fragment>)}
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="elegant" outline onClick={close}>Close</MDBBtn>
            </MDBModalFooter>
        </Fragment>
    );
}

export default RegisterEvent;
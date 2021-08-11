import React, { Fragment, useState, useContext, useEffect } from "react";
import { MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from '../Quillmodules';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from 'material-ui-pickers';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { updateEvent } from '../../../firebase/firebase.db';
import { EventContext } from '../../../context/EventContext';
import { AuthContext } from "../../../context/AuthContext";
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Event Name is mandatory"),
    type: yup
        .string()
        .required("Event Type is mandatory"),
    e_date: yup
        .string()
        .required("Event Date is mandatory"),
    e_time: yup
        .string()
        .required("Event Date is mandatory")
});

const EventDetails = ({ eventDetails, mode }) => {
    const [posterImgBig, setPosterImgBig] = useState(false);
    const [posterImgSmall, setPosterImgSmall] = useState(false);
    const { events, setEvents } = useContext(EventContext);
    const { setIsLoading } = useContext(AuthContext);
    let history = useHistory();

    const createFormik = useFormik({
        initialValues: {
            name: eventDetails ? eventDetails.name : '',
            type: eventDetails ? eventDetails.type : '',
            e_date: eventDetails ? new Date(eventDetails.e_date.seconds*1000) : new Date().toLocaleDateString(),
            e_time: eventDetails ? new Date('1970-01-01T' + eventDetails.e_time) : (new Date()).getTime(),
            can_register: eventDetails ? eventDetails.can_register : false,
            is_reg_open: eventDetails ? eventDetails.is_reg_open : false,
            poster_link_big: (eventDetails && eventDetails.poster_link_big) ? eventDetails.poster_link_big : '',
            poster_link_small: (eventDetails && eventDetails.poster_link_small) ? eventDetails.poster_link_small : '',
            emeeting_link: (eventDetails && eventDetails.emeeting_link) ? eventDetails.emeeting_link : '',
            tc: (eventDetails && eventDetails.tc) ? eventDetails.tc : '',
            payment_enabled: (eventDetails && eventDetails.payment_enabled) ? eventDetails.payment_enabled : false,
            part_amt: (eventDetails && eventDetails.part_amt) ? eventDetails.part_amt : 0,
            audience_amt: (eventDetails && eventDetails.audience_amt) ? eventDetails.audience_amt : 0,
            poster_big: null,
            poster_small: null
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: ({ e_date, e_time, ...details }) => {
            setIsLoading(true);
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

            updateEvent({ ...details, e_date: d, e_time: t, id: eventDetails.id }, (val) => {
                // Update Context with Event Values
                const tempUpcomingEvents = events.upcomingEvents;
                const tempIndex = tempUpcomingEvents.findIndex((i) => i.id === val.id);
                tempUpcomingEvents.splice(tempIndex, 1);
                tempUpcomingEvents.push(val);
                const tempUpcomingEventsWithParticipation = events.upcomingEventsWithParticipation;
                const tempIndex1 = tempUpcomingEventsWithParticipation.findIndex((i) => i.id === val.id);
                tempUpcomingEventsWithParticipation.splice(tempIndex1, 1);
                tempUpcomingEventsWithParticipation.push(val);
                const tempEvents = { ...events, upcomingEvents: tempUpcomingEvents, upcomingEventsWithParticipation: tempUpcomingEventsWithParticipation };
                setEvents(tempEvents);
                setIsLoading(false);
                history.push('/protected/admin');
            });
        },
    });

    const {
        name,
        type,
        e_date,
        e_time,
        can_register,
        is_reg_open,
        emeeting_link,
        tc,
        part_amt,
        audience_amt,
        payment_enabled
    } = createFormik.values;

    return (
        <Fragment>
            <form onSubmit={createFormik.handleSubmit}>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <MDBInput disabled={mode==='past'} label="Event Name" icon="calendar-check" group type="text" name="name" onChange={createFormik.handleChange}
                                value={name} validate />
                            <div className="validation-error">
                                {(createFormik.errors.name && createFormik.touched.name) ? createFormik.errors.name : null}
                            </div>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput disabled={mode==='past'} label="Event Type" icon="calendar-day" group type="text" validate name="type" onChange={createFormik.handleChange}
                                value={type} />
                            <div className="validation-error">
                                {(createFormik.errors.type && createFormik.touched.type) ? createFormik.errors.type : null}
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                            <MDBCol>
                                <DatePicker disabled={mode==='past'} label="Event Date" name="e_date" value={e_date} onChange={value => createFormik.setFieldValue('e_date', value)} format="DD/MM/YYYY"
                                    animateYearScrolling autoOk />
                                <div className="validation-error">
                                    {(createFormik.errors.e_date && createFormik.touched.e_date) ? createFormik.errors.e_date : null}
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <TimePicker disabled={mode==='past'} label="Event Time" name="e_time" showTodayButton value={e_time} onChange={value => createFormik.setFieldValue('e_time', value)} />
                                <div className="validation-error">
                                    {(createFormik.errors.e_time && createFormik.touched.e_time) ? createFormik.errors.e_time : null}
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={mode==='past'}
                                            checked={can_register}
                                            onChange={(e) => createFormik.setFieldValue('can_register', e.target.checked)}
                                            name="can_register"
                                            color="primary"
                                        />
                                    }
                                    label="Registration Required"
                                />
                                <div className="validation-error">
                                    {(createFormik.errors.can_register && createFormik.touched.can_register) ? createFormik.errors.can_register : null}
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={mode==='past'}
                                            checked={is_reg_open === true}
                                            value={is_reg_open}
                                            onChange={(e) => createFormik.setFieldValue('is_reg_open', e.target.checked)}
                                            name="is_reg_open"
                                            color="primary"
                                        />
                                    }
                                    label="Registration Start"
                                />
                                <div className="validation-error">
                                    {(createFormik.errors.is_reg_open && createFormik.touched.is_reg_open) ? createFormik.errors.is_reg_open : null}
                                </div>
                            </MDBCol>
                        </MuiPickersUtilsProvider>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <label>Poster for Big Screen</label>
                                </MDBCol>
                            </MDBRow>
                            {
                                eventDetails && !posterImgBig && (
                                    <Fragment>
                                        <MDBRow>
                                            <MDBCol>
                                                <img className="poster-preview" src={eventDetails.poster_link_big} />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBBtn
                                                    disabled={mode==='past'}
                                                    variant="contained"
                                                    color="elegant"
                                                    type="button"
                                                    onClick={() => setPosterImgBig(true)}
                                                >
                                                    Change Image
                                                </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </Fragment>
                                )
                            }
                            {
                                posterImgBig && (
                                    <Fragment>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput icon="file" group type="file" onChange={(e) => { createFormik.setFieldValue("poster_big", e.target.files[0]); }}
                                                    validate />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBBtn
                                                    variant="contained"
                                                    color="elegant"
                                                    type="button"
                                                    onClick={() => { setPosterImgBig(false); createFormik.setFieldValue("poster_big", null) }}
                                                >
                                                    Cancel
                                                </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </Fragment>
                                )
                            }
                        </MDBCol>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <label>Poster for Big Screen</label>
                                </MDBCol>
                            </MDBRow>
                            {
                                eventDetails && !posterImgSmall && (
                                    <Fragment>
                                        <MDBRow>
                                            <MDBCol>
                                                <img className="poster-preview" src={eventDetails.poster_link_small} />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBBtn
                                                    disabled={mode==='past'}
                                                    variant="contained"
                                                    color="elegant"
                                                    type="button"
                                                    onClick={() => setPosterImgSmall(true)}
                                                >
                                                    Change Image
                                                </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </Fragment>
                                )
                            }
                            {
                                posterImgSmall && (
                                    <Fragment>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBInput icon="file" group type="file" onChange={(e) => { createFormik.setFieldValue("poster_small", e.target.files[0]); }}
                                                    validate />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <MDBBtn
                                                    variant="contained"
                                                    color="elegant"
                                                    type="button"
                                                    onClick={() => { setPosterImgSmall(false); createFormik.setFieldValue("poster_small", null) }}
                                                >
                                                    Cancel
                                                </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </Fragment>
                                )
                            }
                        </MDBCol>

                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput disabled={mode==='past'} label="Meeting Link" icon="external-link-alt" group type="text" name="emeeting_link" onChange={createFormik.handleChange}
                                value={emeeting_link} validate />
                            <div className="validation-error">
                                {(createFormik.errors.emeeting_link && createFormik.touched.emeeting_link) ? createFormik.errors.emeeting_link : null}
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <ReactQuill name="tc" value={tc}
                                disabled={mode==='past'}
                                onChange={(value) => createFormik.setFieldValue('tc', value)}
                                modules={modules}
                                formats={formats} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        disabled={mode==='past'}
                                        checked={payment_enabled}
                                        onChange={(e) => createFormik.setFieldValue('payment_enabled', e.target.checked)}
                                        name="payment_enabled"
                                        color="primary"
                                    />
                                }
                                label="Payment Required"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput disabled={mode==='past'} label="Participant Amount" icon="calendar-day" group type="text" validate name="part_amt" onChange={createFormik.handleChange}
                                value={part_amt} />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput disabled={mode==='past'} label="Audience Amount" icon="calendar-day" group type="text" validate name="audience_amt" onChange={createFormik.handleChange}
                                value={audience_amt} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>

                        <MDBBtn
                            variant="contained"
                            color="elegant"
                            type="submit"
                            disabled={mode==='past'}
                        >
                            Save
                        </MDBBtn>
                    </MDBRow>
                </div>
            </form>
        </Fragment>
    );
}

export default EventDetails;
import React, { Fragment } from "react";
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
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { useFormik } from 'formik';

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
    .required("Event Date is mandatory"),
    poster_link_big: yup
    .string()
    .required("Please enter poster link"),
    poster_link_small: yup
    .string()
    .required("Please enter poster link"),
    emeeting_link: yup
    .string()
    .required("E-meeting link is mandatory")
});

const Page1 = ({ handleBack, formData, handleNext }) => {

    const createFormik = useFormik({
        initialValues: {
            name: formData.name || '',
            type: formData.type || '',
            e_date: formData.e_date || new Date().toLocaleDateString(),
            e_time: formData.e_time || (new Date()).getTime(),
            can_register: formData.can_register || false,
            is_reg_open: formData.is_reg_open || false,
            poster_link_big: formData.poster_link_big || '',
            poster_link_small: formData.poster_link_small || '',
            emeeting_link: formData.emeeting_link || '',
            callback: 'next'
        },
        validationSchema,
        onSubmit: (values) => {
            if(values.callback === 'next') {
                handleNext({...values});
            }
            if(values.callback === 'back') {
                handleBack({...values});
            }
        },
    });

    const clickHandler = (val) => {
        createFormik.setFieldValue('callback', val);
        createFormik.handleSubmit();
    };

    const {
        name,
        type,
        e_date,
        e_time,
        can_register,
        is_reg_open,
        poster_link_big,
        poster_link_small,
        emeeting_link,
    } = createFormik.values;

    return (
        <Fragment>
            <form>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Event Name" icon="calendar-check" group type="text" name="name" onChange={createFormik.handleChange}
                                value={name} validate />
                                <div className="validation-error">
                                    {(createFormik.errors.name && createFormik.touched.name)? createFormik.errors.name : null}
                                </div>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Event Type" icon="calendar-day" group type="text" validate name="type" onChange={createFormik.handleChange}
                                value={type} />
                                <div className="validation-error">
                                    {(createFormik.errors.type && createFormik.touched.type)? createFormik.errors.type : null}
                                </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                            <MDBCol>
                                <DatePicker label="Event Date" name="e_date" value={e_date} onChange={value => createFormik.setFieldValue('e_date', value)} format="DD/MM/YYYY"
                                    animateYearScrolling autoOk />
                                <div className="validation-error">
                                    {(createFormik.errors.e_date && createFormik.touched.e_date)? createFormik.errors.e_date : null}
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <TimePicker label="Event Time" name="e_time" showTodayButton value={e_time} onChange={value => createFormik.setFieldValue('e_time', value)} />
                                <div className="validation-error">
                                    {(createFormik.errors.e_time && createFormik.touched.e_time)? createFormik.errors.e_time : null}
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={can_register}
                                            onChange={(e) => createFormik.setFieldValue('can_register', e.target.checked)}
                                            name="can_register"
                                            color="primary"
                                        />
                                    }
                                    label="Registration Required"
                                />
                                <div className="validation-error">
                                    {(createFormik.errors.can_register && createFormik.touched.can_register)? createFormik.errors.can_register : null}
                                </div>
                            </MDBCol>
                            <MDBCol>
                                <FormControlLabel
                                    control={
                                        <Checkbox
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
                                    {(createFormik.errors.is_reg_open && createFormik.touched.is_reg_open)? createFormik.errors.is_reg_open : null}
                                </div>
                            </MDBCol>
                        </MuiPickersUtilsProvider>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Big Poster Link" icon="link" group type="text" name="poster_link_big" onChange={createFormik.handleChange}
                                value={poster_link_big} validate />
                                <div className="validation-error">
                                    {(createFormik.errors.poster_link_big && createFormik.touched.poster_link_big)? createFormik.errors.poster_link_big : null}
                                </div>
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Small Poster Link" icon="external-link-square-alt" group type="text" validate name="poster_link_small" onChange={createFormik.handleChange}
                                value={poster_link_small} />
                                <div className="validation-error">
                                    {(createFormik.errors.poster_link_small && createFormik.touched.poster_link_small)? createFormik.errors.poster_link_small : null}
                                </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Meeting Link" icon="external-link-alt" group type="text" name="emeeting_link" onChange={createFormik.handleChange}
                                value={emeeting_link} validate />
                             <div className="validation-error">
                                    {(createFormik.errors.emeeting_link && createFormik.touched.emeeting_link)? createFormik.errors.emeeting_link : null}
                                </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBBtn color="elegant" disabled={true} onClick={() => clickHandler('back')}>
                            Back
                                    </MDBBtn>

                        <MDBBtn
                            variant="contained"
                            color="elegant"
                            onClick={() => clickHandler('next')}
                        >
                            Next
                        </MDBBtn>
                    </MDBRow>
                </div>
            </form>
        </Fragment>
    );
}

export default Page1;
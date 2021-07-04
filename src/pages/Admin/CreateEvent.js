import React, { Fragment, useState } from "react";
import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBRow, MDBCol, MDBInput } from "mdbreact";
import { useFormik } from 'formik';

const CreateEvent = ({ close }) => {

    const successCallback = (user) => {
        close();
    };

    const createFormik = useFormik({
        initialValues: {
            name: '',
            type: '',
            datetime: '',
            can_register: false,
            is_reg_open: false,
            poster_link_big: '',
            poster_link_small: '',
            emeeting_link: '',
        },
        onSubmit: values => {
            // createEvent(values);
        },
    });

    const {
        name,
        type,
        datetime,
        can_register,
        is_reg_open,
        poster_link_big,
        poster_link_small,
        emeeting_link,
    } = createFormik.values;

    return (
        <Fragment>
            <MDBModalHeader>Create Event</MDBModalHeader>
            <MDBModalBody>
                <form onSubmit={createFormik.handleSubmit}>
                    <div className="grey-text">
                        {/* <MDBRow>
                            <MDBCol>
                                <MDBInput label="Event Name" icon="user" group type="text" name="name" onChange={createFormik.handleChange}
                                    value={name} validate />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput label="Event Type" icon="user" group type="text" validate name="type" onChange={createFormik.handleChange}
                                    value={type} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput label="Your email" icon="envelope" group type="date" validate name="email" onChange={createFormik.handleChange}
                                    value={email} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput label="Mobile" icon="mobile-alt" group type="text" validate name="mobile" onChange={createFormik.handleChange}
                                    value={mobile} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput label="City" icon="city" group type="text" validate name="city" onChange={createFormik.handleChange}
                                    value={city} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput label="Your password" icon="lock" group type="password" validate name="password" onChange={createFormik.handleChange}
                                    value={password} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate name="c_password" onChange={createFormik.handleChange}
                                    value={c_password} />
                            </MDBCol>
                        </MDBRow> */}
                    </div>
                    <div className="text-center">
                        <MDBBtn color="elegant" type="submit">Register</MDBBtn>
                        <MDBBtn color="elegant" type="reset">Reset</MDBBtn>
                    </div>
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="elegant" outline onClick={close}>Close</MDBBtn>
            </MDBModalFooter>
        </Fragment>
    );
}

export default CreateEvent;
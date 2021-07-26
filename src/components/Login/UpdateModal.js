import React, { Fragment, useState, useContext } from "react";
import { MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn ,MDBInput ,MDBIcon } from "mdbreact";

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    mobile: yup
    .string()
    .required("Mobile is mandatory"),
    city: yup
    .string()
    .required("City is mandatory"),
});



const UpdateModal = ({updateUser,user, setIsLoading}) => {
    const {handleChange,handleSubmit,values,errors,touched} = useFormik({
        initialValues: {
            mobile: '',
            city: ''
        },
        validationSchema,
        onSubmit: values => {
            setIsLoading(true);
            updateUser(user,values.mobile,values.city);
        },
    });

    return(
        <form onSubmit={handleSubmit}>
            <Fragment>
                <MDBModalHeader>Update profile</MDBModalHeader>
                <MDBModalBody>
                <div className="grey-text">
                    <MDBInput label="Enter mobile number" icon="mobile" type="text"  name="mobile"
                        onChange={handleChange}
                        validate error="wrong"
                        success="right"
                    />
                    <div className="validation-error">
                        {(errors.mobile && touched.mobile)? errors.mobile : null}
                    </div>
                    <br/>
                    <MDBInput label="Enter your city" icon="city" type="text" name="city"
                        onChange={handleChange}
                        validate error="wrong"
                        success="right"
                    />
                    <div className="validation-error">
                        {(errors.city && touched.city)? errors.city : null}
                    </div>
                </div>
                <div className="text-center mt-2">
                    <MDBBtn color="elegant" outline type="submit" className="btn-link">Update</MDBBtn>
                </div>
                </MDBModalBody>
            </Fragment>
        </form>
    )
}

export default UpdateModal;
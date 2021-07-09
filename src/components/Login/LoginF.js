import React from "react";
import { MDBBtn, MDBInput ,MDBIcon} from "mdbreact";
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup
    .string()
    .required("Email is mandatory"),
    password: yup
    .string()
    .required("Password is mandatory"),
});

const LoginF = ({ login , gLogin }) => {

    const {handleChange,handleSubmit,values,errors,touched} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            console.log(errors);
            login(values.email, values.password);
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className="grey-text">
                <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                    success="right" name="email"
                    onChange={handleChange}
                    values={values.email} />
                    <div className="validation-error">
                        {(errors.email && touched.email)? errors.email : null}
                    </div>
                    <br/>
                <MDBInput label="Type your password" icon="lock"
                    group type="password"
                    name="password"
                    onChange={handleChange}
                    values={values.password} />
                    <div className="validation-error">
                        {(errors.password && touched.password)? errors.password : null}
                    </div>
            </div>
            <div className="text-center mt-5">
                <MDBBtn color="elegant" type="submit">Login</MDBBtn>
                <MDBBtn color="elegant" type="reset">Reset</MDBBtn>
            </div>
            <div className="text-center mt-2">
                <MDBBtn onClick={gLogin} gradient="blue" type="submit">
                    <MDBIcon className="mr-2" fab icon="google" />
                        Login using Google
                </MDBBtn>
            </div>
        </form>
    );
}

export default LoginF;
import React from "react";
import { MDBBtn, MDBInput } from "mdbreact";
import { useFormik } from 'formik';

const LoginF = ({ login }) => {

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            login(values.email, values.password);
        },
    });

    return (
        <form onSubmit={loginFormik.handleSubmit}>
            <div className="grey-text">
                <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                    success="right" name="email"
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.email} />
                <MDBInput label="Type your password" icon="lock"
                    group type="password"
                    name="password"
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.password} />
            </div>
            <div className="text-center">
                <MDBBtn color="elegant" type="submit">Login</MDBBtn>
                <MDBBtn color="elegant" type="reset">Reset</MDBBtn>
            </div>

        </form>
    );
}

export default LoginF;
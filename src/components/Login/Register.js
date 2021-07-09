import React from "react";
import { MDBBtn, MDBInput, MDBRow, MDBCol } from "mdbreact";
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    f_name: yup
    .string()
    .required("First Name is mandatory"),
    l_name: yup
    .string()
    .required("Last Name is mandatory"),
    email: yup
    .string()
    .required("Email is mandatory"),
    mobile: yup
    .string()
    .required("Mobile Number is mandatory"),
    city: yup
    .string()
    .required("City is mandatory"),
    password: yup
    .string()
    .required("Password is mandatory"),
    c_password: yup
    .string()
    .required("Confirm Password Field is mandatory"),
});

const Register = ({ register }) => {

    const registerFormik = useFormik({
        initialValues: {
            f_name: '',
            l_name: '',
            email: '',
            mobile: '',
            city: '',
            password: '',
            c_password: ''
        },
        validationSchema,
        onSubmit: ({
            f_name,
            l_name,
            email,
            mobile,
            city,
            password,
            c_password
        }) => {
            if (password === c_password) {
                register(email, password, { f_name, l_name, email, mobile, city, roles: ['USER'] });
            }
        },
    });

    const {
        f_name,
        l_name,
        email,
        mobile,
        city,
        password,
        c_password
    } = registerFormik.values;

    return (
        <form onSubmit={registerFormik.handleSubmit}>
            <div className="grey-text">
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="First Name" icon="user" group type="text" name="f_name" onChange={registerFormik.handleChange}
                            value={f_name} validate />
                            <div className="validation-error">
                                {(registerFormik.errors.f_name && registerFormik.touched.f_name)? registerFormik.errors.f_name : null}
                            </div>
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="Last Name" icon="user" group type="text" validate name="l_name" onChange={registerFormik.handleChange}
                            value={l_name} />
                            <div className="validation-error">
                                {(registerFormik.errors.l_name && registerFormik.touched.l_name)? registerFormik.errors.l_name : null}
                            </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="Your email" icon="envelope" group type="email" validate name="email" onChange={registerFormik.handleChange}
                            value={email} />
                            <div className="validation-error">
                                {(registerFormik.errors.email && registerFormik.touched.email)? registerFormik.errors.email : null}
                            </div>
                    </MDBCol>
                    
                    <MDBCol>
                        <MDBInput label="Mobile" icon="mobile-alt" group type="tel" validate name="mobile" onChange={registerFormik.handleChange}
                            value={mobile} />
                             <div className="validation-error">
                                {(registerFormik.errors.mobile && registerFormik.touched.mobile)? registerFormik.errors.mobile : null}
                            </div>
                    </MDBCol>
                   
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="City" icon="city" group type="text" validate name="city" onChange={registerFormik.handleChange}
                            value={city} />
                             <div className="validation-error">
                                {(registerFormik.errors.city && registerFormik.touched.city)? registerFormik.errors.city : null}
                            </div>
                    </MDBCol>
                   
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="Your password" icon="lock" group type="password" validate name="password" onChange={registerFormik.handleChange}
                            value={password} />
                            <div className="validation-error">
                                {(registerFormik.errors.password && registerFormik.touched.password)? registerFormik.errors.password : null}
                            </div>
                    </MDBCol>
                    
                    <MDBCol>
                        <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate name="c_password" onChange={registerFormik.handleChange}
                            value={c_password} />
                            <div className="validation-error">
                                {(registerFormik.errors.c_password && registerFormik.touched.c_password)? registerFormik.errors.c_password : null}
                            </div>
                    </MDBCol>
                    
                </MDBRow>
            </div>
            <div className="text-center">
                <MDBBtn color="elegant" type="submit">Register</MDBBtn>
                <MDBBtn color="elegant" type="reset">Reset</MDBBtn>
            </div>
        </form>
    );
}

export default Register;
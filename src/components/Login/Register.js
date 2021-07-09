import React from "react";
import { MDBBtn, MDBInput, MDBRow, MDBCol } from "mdbreact";
import { useFormik } from 'formik';

const Register = ({ register }) => {

    const registerFormik = useFormik({
        initialValues: {
            f_name: '',
            l_name: '',
            email: '',
            mobile: '',
            city: '',
            password: '',
            c_password: '',
            insta: ''
        },
        onSubmit: ({
            f_name,
            l_name,
            email,
            mobile,
            city,
            password,
            c_password,
            insta
        }) => {
            if (password === c_password) {
                register(email, password, { f_name, l_name, email, mobile, city, roles: ['USER'], insta });
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
        c_password,
        insta
    } = registerFormik.values;

    return (
        <form onSubmit={registerFormik.handleSubmit}>
            <div className="grey-text">
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="First Name" icon="user" group type="text" name="f_name" onChange={registerFormik.handleChange}
                            value={f_name} validate />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="Last Name" icon="user" group type="text" validate name="l_name" onChange={registerFormik.handleChange}
                            value={l_name} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="Your email" icon="envelope" group type="email" validate name="email" onChange={registerFormik.handleChange}
                            value={email} />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="Mobile" icon="mobile-alt" group type="text" validate name="mobile" onChange={registerFormik.handleChange}
                            value={mobile} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="City" icon="city" group type="text" validate name="city" onChange={registerFormik.handleChange}
                            value={city} />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="Instagram Id" icon="link" group type="text" validate name="insta" onChange={registerFormik.handleChange}
                            value={insta} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="Your password" icon="lock" group type="password" validate name="password" onChange={registerFormik.handleChange}
                            value={password} />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="Confirm your password" icon="exclamation-triangle" group type="password" validate name="c_password" onChange={registerFormik.handleChange}
                            value={c_password} />
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
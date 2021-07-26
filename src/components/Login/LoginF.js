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

const LoginF = ({ login , gLogin , fLogin, aLogin, tLogin }) => {

    const {handleChange,handleSubmit,values,errors,touched} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
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
            <div className="text-center mt-4">
                <MDBBtn color="elegant" type="submit">Login</MDBBtn>
                <MDBBtn color="elegant" type="reset">Reset</MDBBtn>
            </div>
            <div className="text-center mt-3">
                Or Login using
            </div>
            <div className="text-center mt-2">
                <MDBIcon title="Google" onClick={gLogin} className="mr-3 ml-1" fab icon="google" />
                <MDBIcon title="Facebook" onClick={fLogin} className="mr-3" fab icon="facebook" />
                <MDBIcon title="Apple" onClick={aLogin} className="mr-3" fab icon="apple" />
                <MDBIcon title="Twitter" onClick={tLogin} className="" fab icon="twitter" />
            </div>
        </form>
    );
}

export default LoginF;
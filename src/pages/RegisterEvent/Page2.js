import React, { Fragment } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { useFormik } from 'formik';

const Page2 = ({ handleBack, formData, handleNext, eventDetails }) => {

    const createFormik = useFormik({
        initialValues: {
            accpettc: formData.accpettc || ''
        },
        onSubmit: (values) => {
            if (values.callback === 'next') {
                handleNext({ ...values });
            }
            if (values.callback === 'back') {
                handleBack({ ...values });
            }
        },
    });

    const clickHandler = (val) => {
        createFormik.setFieldValue('callback', val);
        createFormik.handleSubmit();
    };

    const {
        accpettc
    } = createFormik.values;

    return (
        <Fragment>
            <form>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <h3> Terms and Conditions</h3>
                            <div dangerouslySetInnerHTML={{ __html: eventDetails.tc }}></div>
                        </MDBCol>
                    </MDBRow>
                    {eventDetails && eventDetails.payment_enabled && (<MDBRow>
                        <MDBCol>
                            <h3> Payment Details</h3>
                            <div dangerouslySetInnerHTML={{ __html: eventDetails.payment }}></div>
                        </MDBCol>
                    </MDBRow>)}
                    <MDBRow>
                        <MDBCol>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={accpettc}
                                        onChange={(e) => createFormik.setFieldValue('accpettc', e.target.checked)}
                                        name="accpettc"
                                        color="primary"
                                    />
                                }
                                label="Accept Terms and Conditions"
                            />
                        </MDBCol></MDBRow>
                    <MDBRow>
                        <MDBBtn color="elegant" onClick={() => clickHandler('back')}>
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

export default Page2;
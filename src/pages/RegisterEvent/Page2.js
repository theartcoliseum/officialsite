import React, { Fragment } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";
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
        <MDBContainer>
            <form>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <h4 className="register-pg-title"> Terms and Conditions</h4>
                            <div dangerouslySetInnerHTML={{ __html: eventDetails.tc }}></div>
                        </MDBCol>
                    </MDBRow>
                    {eventDetails && eventDetails.payment_enabled && (<MDBRow>
                        <MDBCol>
                            <h4 className="register-pg-title"> Entry Fee for Participants</h4>
                            <strong><label>{eventDetails.part_amt}</label></strong>
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
                    <MDBRow className="buttons-row">
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
            </MDBContainer>
    );
}

export default Page2;
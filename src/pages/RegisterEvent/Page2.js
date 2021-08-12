import React, { Fragment } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { MDBRow, MDBCol, MDBBtn, MDBContainer, MDBInput } from "mdbreact";
import { useFormik } from 'formik';

const Page2 = ({ handleBack, formData, handleNext, eventDetails }) => {

    const createFormik = useFormik({
        initialValues: {
            accpettc: formData.accpettc || '',
            payment_type: formData.payment_type || '',
            payment_reciept: formData.payment_reciept || '',
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
        accpettc,
        payment_type,
        payment_reciept
    } = createFormik.values;

    return (
        <MDBContainer>
            <form>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <h4 className="register-pg-title">T&C</h4>
                            <div dangerouslySetInnerHTML={{ __html: eventDetails.tc }}></div>
                        </MDBCol>
                    </MDBRow>
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
                    {eventDetails && eventDetails.payment_enabled && (
                        <Fragment>
                            <h4 className="register-pg-title">Payment</h4>
                            <MDBRow>
                                <MDBCol>

                                    <span className="event-title-bold">Entry Fee</span> &nbsp;
                                <strong><label>{eventDetails.part_amt}</label></strong>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol lg="12">
                                    <span className="event-title-bold">Payment Type</span>
                                </MDBCol>
                                <MDBCol lg="12">
                                    <FormControl component="fieldset">
                                        <RadioGroup name="payment_type" value={payment_type} onChange={createFormik.handleChange}>
                                            <FormControlLabel value="Online" control={<Radio />} label="Online Payment" />
                                            <FormControlLabel value="Paytm_Insider" control={<Radio />} label="Paytm Insider" />
                                            <FormControlLabel value="Gift_card" control={<Radio />} label="Gift Card" />
                                        </RadioGroup>
                                    </FormControl>
                                </MDBCol>
                                <MDBCol lg="12">
                                    <span>For Paytm Insider or Gift Card Options, please upload the Gift Card or Paytm Insider Screenshot.For Online Payment Option, you will be directed to payment in the last step of registration.</span>
                                </MDBCol>

                            </MDBRow>
                            {payment_type && payment_type !== 'Online' && (<MDBRow>
                                <MDBCol lg="12">
                                    <span className="event-title-bold">Upload Giftcard/Paytm Insider Reciept</span>
                                </MDBCol>
                                <MDBCol lg="12">
                                    <span className="event-title-bold"><MDBInput icon="file" group type="file" onChange={(e) => { createFormik.setFieldValue("payment_reciept", e.target.files[0]); }}
                                        validate /></span>
                                </MDBCol>
                            </MDBRow>)}
                        </Fragment>)}

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
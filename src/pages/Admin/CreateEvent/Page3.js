import React, { Fragment } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { useFormik } from 'formik';


const Page3 = ({ handleBack, formData, handleNext }) => {

    const createFormik = useFormik({
        initialValues: {
            part_amt: formData.part_amt || '',
            audience_amt: formData.audience_amt || '',
            payment_enabled: formData.payment_enabled || false
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
        payment_enabled,
        part_amt,
        audience_amt
    } = createFormik.values;

    return (
        <Fragment>
            <form>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={payment_enabled}
                                        onChange={(e) => createFormik.setFieldValue('payment_enabled', e.target.checked)}
                                        name="payment_enabled"
                                        color="primary"
                                    />
                                }
                                label="Payment Required"
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput label="Participant Amount" icon="money-bill-alt" group type="text" validate name="part_amt" onChange={createFormik.handleChange}
                                value={part_amt} />
                            {/* <div className="validation-error">
                                    {(createFormik.errors.type && createFormik.touched.type)? createFormik.errors.type : null}
                                </div> */}
                        </MDBCol>
                        <MDBCol>
                            <MDBInput label="Audience Amount" icon="money-bill-alt" group type="text" validate name="audience_amt" onChange={createFormik.handleChange}
                                value={audience_amt} />
                            {/* <div className="validation-error">
                                    {(createFormik.errors.type && createFormik.touched.type)? createFormik.errors.type : null}
                                </div> */}
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBBtn color="elegant" onClick={() => clickHandler('back')}>
                            Back
                                    </MDBBtn>

                        <MDBBtn
                            variant="contained"
                            color="elegant"
                            onClick={() => clickHandler('next')}
                        >
                            Finish
                        </MDBBtn>
                    </MDBRow>
                </div>
            </form>
        </Fragment>
    );
}

export default Page3;
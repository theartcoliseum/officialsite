import React, { Fragment } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { useFormik } from 'formik';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const Page3 = ({ handleBack, formData, handleNext }) => {

    const createFormik = useFormik({
        initialValues: {
            payment: formData.payment || '',
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
        payment
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
                            <ReactQuill value={payment}
                                onChange={(value) => createFormik.setFieldValue('payment', value)}
                                modules={modules}
                                formats={formats} />
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
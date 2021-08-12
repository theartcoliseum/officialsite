import React, { Fragment } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from '../Quillmodules';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { useFormik } from 'formik';

const Page2 = ({ handleBack, formData, handleNext }) => {

    const createFormik = useFormik({
        initialValues: {
            tc: formData.tc || ''
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
        tc
    } = createFormik.values;

    return (
        <Fragment>
            <form>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                            <ReactQuill name="tc" value={tc}
                                onChange={(value) => createFormik.setFieldValue('tc', value)}
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
                            Next
                        </MDBBtn>
                    </MDBRow>
                </div>
            </form>
        </Fragment>
    );
}

export default Page2;
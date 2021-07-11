import React, { Fragment } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { useFormik } from 'formik';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
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
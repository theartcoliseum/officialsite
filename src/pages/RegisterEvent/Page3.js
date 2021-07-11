import React, { Fragment } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { useFormik } from 'formik';


const Page3 = ({ handleBack, formData, handleNext }) => {

    const createFormik = useFormik({
        initialValues: {
            perf_type: formData.perf_type || '',
            audition_link: formData.audition_link || false,
            audition_url: formData.audition_url || false
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
        perf_type,
        audition_link,
        audition_url
    } = createFormik.values;

    return (
        <Fragment>
            <form>
                <div className="grey-text">
                    <MDBRow>
                        <MDBCol>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Performance Type</FormLabel>
                            <RadioGroup name="perf_type" value={perf_type} onChange={createFormik.handleChange}>
                                <FormControlLabel value="Poetry" control={<Radio />} label="Poetry" />
                                <FormControlLabel value="STORYTELLING" control={<Radio />} label="STORYTELLING" />
                                <FormControlLabel value="INSTRUMENTAL" control={<Radio />} label="INSTRUMENTAL" />
                                <FormControlLabel value="VOCAL" control={<Radio />} label="VOCAL" />
                                <FormControlLabel value="COMEDY" control={<Radio />} label="COMEDY" />
                                <FormControlLabel value="MIMICRY" control={<Radio />} label="MIMICRY" />
                            </RadioGroup>
                            </FormControl>
                        </MDBCol>
                    </MDBRow>
                    
                    <MDBRow>
                        <MDBCol>
                        <h6> 1 MIN AUDIO or VIDEO CLIP of your performance </h6>
                        <br></br>
                            <MDBInput icon="file" group type="file" onChange={(e) => {createFormik.setFieldValue("audition_link", e.target.files[0]);}}
                             validate />
                        </MDBCol>
                        <MDBCol>
                        <h6>  URL LINK OF YOUR PERFORMANCE FROM YOUTUBE OR INSTAGRAM OR ANY OTHER APPLICATION ( UPLOAD THE FILE ON YOUR GOOGLE DRIVE AND SHARE THE LINK ) </h6>
                            <MDBInput icon="link" group type="text" name="audition_url" value={audition_url} onChange={createFormik.handleChange}
                             validate />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBBtn color="elegant" onClick={() => clickHandler('back')}>Back</MDBBtn>
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
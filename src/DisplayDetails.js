import React from 'react';
import './App.css';
import SuccessPage from './SuccessPage';
import { Formik } from 'formik';
import * as Yup from 'yup';

class DisplayDetails extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            isShowCompany: false,
            isRegistration: true,
            clgName: "",
            studentName: "",
            deptName: "",
            year: "",
            entryDate: 0,
        }
        this.initialValues ={
            companyName:'',
            emailId: '',
            terms: '',
            yoe: '',
            digit1: '',
        }
        this.validationSchema=Yup.object().shape({
            companyName:Yup.string().required('Company Name is Required'),
            emailId: Yup.string().required().matches((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/),"Invalid Email"),
            terms:Yup.string().required('Terms & Condition is Required'),
            yoe: Yup.string().required('Year of Experience is Required'),
            digit1:Yup.string().required().matches((/^[0-9]{10}$/),"Invalid Degits"),
        })
    }

    submitCompanyValue = () => {
        const {companyDetails} = this.props;
        this.setState({
            isShowCompany:true,
            companyDetails: !companyDetails,
        })
    }
    submitOtpValue = () => {
        alert("Your registration is successfully completed");
        this.setState({
            isRegistration: true,
            openModal: true,
        })
    }
    closePage = () => {
        console.log('gggggg');
        this.setState({
            isRegistration: false,
        })
    }
     preview =(event)=> {
        let frame = document.getElementById('frame');
        frame.src=URL.createObjectURL(event.target.files[0]);
      }
    render() {
console.log("ggjjj", this.state.isRegistration);
        return (
            <div className="DisplayDetails">
                {this.state.isShowCompany ? 
                <>
                <header className="nav_bar">Email Verification</header>
                <div className="nav_header">Enter Your OTP</div>
                <div className="sub_title">For your security, we need to verify your identity, We sent a 5-digit code to</div>
                <div className="sub_title">name@domain.com. Please enter it below.</div>
                <Formik
            initialValues={this.initialValues}
            validationSchema={this.validationSchema}
            handleSubmit={this.submitDetails}
            >
            {
            ({values,handleChange,handleBlur,touched,errors,handleSubmit})=>
                (
                <form id="bookDetails" className="form_group">
                    <label>Enter Your Code</label><br></br>
                    <div className="input_box">
                    <input className="digit-group" name="digit1" id="digit1" onChange={this.props.handleChange} />
                    {touched.digit1 && errors.digit1 && <div id="name-error" className="error">{errors.digit1}</div> }
                    <input className="digit-group" name="digit2" id="digit2" onChange={this.props.handleChange} />
                    <input className="digit-group" name="digit3" id="digit3" onChange={this.props.handleChange} />
                    <input className="digit-group" name="digit4" id="digit4" onChange={this.props.handleChange} />
                    <input className="digit-group" name="digit5" id="digit5" onChange={this.props.handleChange} />
                    </div>
                    <hr></hr>
                    <div className="mt_5">
                        Didn't receive the email? Check your spam filter for an email from <a className="link_color"href="">name@domain.com</a>
                    </div>
                    <button id="back" className="button_flex">Back</button>
                    <button id="submit" className="button_flex ml_5" onClick={this.submitOtpValue}>Next</button>
                </form>
                  )
                }
                </Formik>
               </> : <>
               { this.state.isShowCompany === false ?
               <>
                <header className="nav_bar">Company Details</header>
                <div className="nav_header">Add your company details</div>
                <div className="sub_title">Lorem lpsum is simply dummy text of the printing and typesetting industry</div>
                <Formik
            initialValues={this.initialValues}
            validationSchema={this.validationSchema}
            handleSubmit={this.submitDetails}
            >
            {
            ({values,handleChange,handleBlur,touched,errors,handleSubmit})=>
                (
                <form id="bookDetails" className="form_group">
                    <label>Upload your company logo</label><br></br>
                    <div className="logo">
                <img id="frame" alt="Avatar" src="img_avatar.png" className="logo_img" />
                <input className ="ml_15 mt_20" type="file" onChange={(e, data) => { this.preview(e, data);}}/>
                </div><br></br>
                    <label>Company Name</label><br></br>
                    <input className="input_label" id="companyName" name="companyName" value={values.companyName} onBlur={handleBlur}/>
                    {touched.companyName && errors.companyName && <div id="name-error" className="error">{errors.companyName}</div> }
                    <br></br><br></br>
                    <label>Email Id</label><br></br>
                    <input className="input_label" id="emailId" name="emailId" value={values.emailId} onBlur={handleBlur}/>
                    {touched.emailId && errors.emailId && <div id="name-error" className="error">{errors.emailId}</div> }
                    <br></br><br></br>
                    <label>Job Title</label><br></br>
                    <input className="input_label" id="jobTitle" name="jobTitle" value={values.jobTitle} onBlur={handleBlur}/>
                    {touched.jobTitle && errors.jobTitle && <div id="name-error" className="error">{errors.jobTitle}</div> }
                    <br></br><br></br>
                    <label>Year of Experience</label><br></br>
                    <input className="input_label" id="yoe" name="yoe" onBlur={handleBlur} value={values.yoe}/>
                    {touched.yoe && errors.yoe && <div id="name-error" className="error">{errors.yoe}</div> }
                    <br></br><br></br>
                    <input  id="checkBox1" type="checkbox" name="terms" onChange={this.props.handleChange} value={values.terms} onBlur={handleBlur}/>  I accept the <a className="link_color" href="">Terms and Condition</a><br></br><br></br>
                    {touched.terms && errors.terms && <div id="name-error" className="error">{errors.terms}</div> }
                    <button id="back" className="button_flex">Back</button>
                    <button id="submit" className="button_flex ml_5" onClick={this.submitCompanyValue}>Next</button>
                </form>
                  )
                }
                </Formik>
                 <br></br>
                <div className="sub_title">Already have an account? <a className="link_color"href="">Log in</a></div>
    </>:<></>}
                </>
                }
                {
                this.state.isRegistration ? 
                 <><SuccessPage 
                 isRegistration={this.props.isRegistration}
                 closePage={this.closePage}
                 /></> :
                <>
                </> 
    }
            </div>

        )
    }
}
export default DisplayDetails;

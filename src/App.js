import React from 'react';
import './App.css';
import DisplayDetails from './DisplayDetails';
import { Formik } from 'formik';
import * as Yup from 'yup';

class App extends React.Component {


    constructor() {
        super()
        this.state = {
            isShowLogin: true,
            companyDetails: false,
            fullName: "",
            gender: "",
            country: "",
            state: "",
            mobileNumber: '',
            formValues: '',
        }
        this.initialValues ={
            fullName:'',
            checked: false,
            gender: false,
            country: '',
            state: '',
            mobileNumber: '',
        }
        this.validationSchema=Yup.object().shape({
            fullName:Yup.string().required('Full Name is Required'),
            checked: Yup.bool().oneOf([true], 'Gender is Required'),
            country:Yup.string().required('Country is Required'),
            state: Yup.string().required('State is Required'),
            mobileNumber:Yup.string().required().matches((/^[0-9]{10}$/),"Invalid MobileNumber"),
        })
    }
    

    handleChange = (e) => {
        console.log("values",e.target.name,e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    submitValue = (values) => {
        this.setState({
            isShowLogin:false,
            companyDetails: true,
            formValues: values,
        })
    }


    render() {
        return (
            <div className="App">

                {this.state.isShowLogin ?
                <>
                <header className="nav_bar">Personal Details</header>
                <div className="nav_header">Add your personal details</div>
                <div className="sub_title">Lorem lpsum is simply dummy text of the printing and typesetting industry</div>
                <Formik
            initialValues={this.initialValues}
            validationSchema={this.validationSchema}
            handleSubmit={this.submitDetails}
            >
            {
            ({values,handleChange,handleBlur,touched,errors,handleSubmit})=>
                (
                    <form id="libraryLogin" className="form_group">
                        <label>Full Name</label><br></br>
                        <input className="input_label" id="fullName" type="text" name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} required/><br></br><br></br>
                        {touched.fullName && errors.fullName && <div id="name-error" className="error">{errors.fullName}</div> }
                        <label>Gender</label><br></br>
                        <div className="mt_5">
                        <input  id="checkBox1" type="checkbox" name="male" onChange={handleChange} value={values.checked}/>  Male
                        <input className="ml_15" id="checkBox1" type="checkbox" name="male" value={values.checked}onChange={handleChange}/>  Female
                        <input className="ml_15" id="checkBox1" type="checkbox" name="male" value={values.checked} onChange={handleChange}/>  Other<br></br><br></br>
                        {touched.gender && errors.gender && <div id="name-error" className="error">{errors.gender}</div> }
                        </div>
                        <label>Country</label><br></br>
                        <select type="text" name="country" id="country" onChange={handleChange} required>
                        <option>India</option>
                        <option>Canada</option>
                        <option>China</option>
                        <option>USA</option>
                        <option>UK</option>
                        </select>
                        {touched.country && errors.country && <div id="name-error" className="error">{errors.country}</div> }
                        <br></br><br></br>
                        <label>State</label><br></br>
                        <select type="text" name="state" id="state" onChange={handleChange} required>
                        <option>TamilNadu</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        </select>
                        {touched.state && errors.state && <div id="name-error" className="error">{errors.state}</div> }
                        <br></br><br></br>
                        <label>Phone Number</label><br></br>
                        <input className="input_label" id="mobileNumber" value={values.mobileNumber} type="number" name="mobileNumber" required onChange={handleChange} /><br></br><br></br>
                        {touched.mobileNumber && errors.mobileNumber && <div id="name-error" className="error">{errors.mobileNumber}</div> }
                        <button id="submit" className="button_label" onClick={this.submitValue}>Next</button>
                    </form> 
                    )
                }
                </Formik>
                    <br></br>
                <div className="sub_title">Already have an account? <a className="link_color"href="">Log in</a></div>
                    </>
                    :
                    <></> 
                }
                {
                    this.state.companyDetails ?
                    <>
                    <DisplayDetails
                            submitValue={this.submitValue}
                            handleChange={this.handleChange}
                            isShowLogin={this.state.isShowLogin}
                            companyDetails={this.state.companyDetails}
                        />
                        </> :<></>
                }
            </div>

        )
    }
}
export default App;

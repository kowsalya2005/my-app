import React from 'react';
import './App.css';

class SuccessPage extends React.Component {

      render() {

        return (
            <div className="DisplayDetails">
               {
                this.props.isRegistration ? 
                 <><form id="successMessage" className="form_group">
                 <h4>Your Registration Process Is Successfully Completed.</h4>
                 <center><button id="submit" className="button_flex ml_5" onClick={this.closePage}>Close
                 </button></center>
                </form></> :
                <>
                </> 
    }
            </div>

        )
    }
}
export default SuccessPage;

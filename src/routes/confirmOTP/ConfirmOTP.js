
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ConfirmOTP.css';
//import Link from '../../components/Link'

const title = 'Enter the OTP to validate the phone';

function ConfirmOTP( {email, newphone}, context) {
    context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
   
        <form name="form1" method="put" action="updateproviderphone" >
          
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="otp">
              OTP:
            </label>
            <input
              className={s.input}
              id="otp"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              required="required"             
            />
            <input   
              id="email"
              type="hidden"
              name="email"
              value = {email}
              />
          <input
              className={s.input}
              id="newphone"
              type="hidden"
              name="newphone"
              value={newphone}             
              />
          </div>
          <div className={s.formGroup}>
            <button className={s.button}   type="submit" >
              Confirm OTP
            </button>
            
          </div>
        </form>
        
      </div>
    </div>
    
  );
}

ConfirmOTP.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(ConfirmOTP);
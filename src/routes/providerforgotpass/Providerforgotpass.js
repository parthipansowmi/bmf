

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Providerforgotpass.css';
import Link from '../../components/Link'

const title = 'Changing Provider Password';

 

function Providerforgotpass( props, context) {
    context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
   
        <form name="form1" method="put" action="providerforgotpass" >
          
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="email">
              Email:
            </label>
            <input
              className={s.input}
              id="email"
              type="email"
              name="email"
              placeholder="Enter E-mail"
              required="required"             
            />
          
          </div>
          <div className={s.formGroup}>
            <button className={s.button}   type="submit" >
              Send Reset Email
            </button>
            
          </div>
        </form>
        
      </div>
    </div>
    
  );
}

Providerforgotpass.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Providerforgotpass);
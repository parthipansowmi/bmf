

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Changeprovideremail.css';
import Link from '../../components/Link'

const title = 'Change Email';



function Changeprovideremail({email, passCode, sessionid}, context) {
  console.log("Changeprovideremail: "+email);
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
       
        <form name="form1" method="put" action="updateprovideremail" >
        
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="oldemail">
              Current E-mail:
            </label>
            <input
              className={s.input}
              id="oldemail"
              type="text"
              name="oldemail"
              value={email}
              readOnly
              />
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="newemail">
              New E-mail:
            </label>
            <input
              className={s.input}
              id="newemail"
              type="email"
              name="newemail"              
              />
              
          </div>
          <div className={s.formGroup}>
            <button className={s.button}    value="Change Email" type="submit" >
              Change Password
            </button>
           
              <input   
              id="code"
              type="hidden"
              name="code"
              value = {passCode}
              />
          </div>
          <script>
          </script>
        </form>

      </div>
    </div>

  );
}

Changeprovideremail.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Changeprovideremail);

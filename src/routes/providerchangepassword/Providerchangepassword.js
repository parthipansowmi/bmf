

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './providerchangepassword.css';
import Link from '../../components/Link'

const title = 'Changing Password';



function Changepassword({email, passCode, message}, context) {
  console.log("Changepassword: "+email);
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <script type="text/javascript" src="../scripts/passwordmatch.js">
         
        </script>
        <form name="form1" method="put" action="updateproviderpass" >
        
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="password">
              New Password:
            </label>
            <input
              className={s.input}
              id="newpass"
              type="password"
              name="newpass"
              autoFocus
              required
              />
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="password">
              Confirm Password:
            </label>
            <input
              className={s.input}
              id="confirmpass"
              type="password"
              name="confirmpass"              
              />
              <label className={s.label1} htmlFor="message">
              {message}
            </label>
          </div>
          <div className={s.formGroup}>
            <button className={s.button}    value="Change Password" type="submit" >
              Change Password
            </button>
            <input
              className={s.input}
              id="email"
              type="hidden"
              name="email"
              value = {email}
              />
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

Changepassword.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Changepassword);

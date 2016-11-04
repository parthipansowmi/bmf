

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './changepassword.css';
import Link from '../../components/Link'

const title = 'Changing Password';



function Changepassword({email}, context) {
  console.log("Changepassword: "+email);
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>

        <form name="form1" method="put" action="updatepass" >
        
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

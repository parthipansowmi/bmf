/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Providerlogin.css';
import Link from '../../components/Link'
import Formsy from 'formsy-react';

const title = 'Entering Credentials';

function Providerlogin(props, context) {
  context.setTitle(title);
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p className={s.lead}>Log in with your username or email address.</p>
        <div className={s.formGroup}>
        <form name="form1" method="get"  action="verifylogin" >
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="usernameOrEmail">
              Username or email address:
            </label>
            <input
              className={s.input}
              id="usernameOrEmail"
              type="email"
              name="usernameOrEmail"
              required="required"
              autoFocus
              />
          </div>
          <div className={s.formGroup}>
            <label className={s.label}  htmlFor="password">
              Password:
            </label>
            <input
              className={s.input}
              id="password"
              type="password"
              name="password"
              required="required"
              />

          </div>
          <div className={s.formGroup}>
            <button className={s.button1}   type="submit" >
              Log in
            </button>
            <Link  to="/forgotpass">Forgot Password</Link>
            <span className={s.spacer}> | </span>
            <Link  to="/register">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
    </div>


  );
}


Providerlogin.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Providerlogin);

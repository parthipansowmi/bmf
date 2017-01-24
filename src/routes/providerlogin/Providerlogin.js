
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Providerlogin.css';
import Link from '../../components/Link'


const title = 'Entering Credentials';

function Providerlogin({sessionid}, context) {
  console.log("ProviderLogin.js-SessionId: "+sessionid);
  context.setTitle(title);
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p className={s.lead}>Log in with your username or email address.</p>
        <div className={s.formGroup}>
        <form name="form1" method="get"  action="verifyproviderlogin" >
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="usernameOrEmail">
              Username or email address:
            </label>
            <input
              className={s.input}
              id="email"
              type="email"
              name="email"
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
              <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
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

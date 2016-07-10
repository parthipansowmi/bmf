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
import s from './Login.css';
import Link from '../../components/Link'
import Formsy from 'formsy-react';


const title = 'Entering Credentials';
const MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    const errorMessage = this.getErrorMessage();
    console.log("Message: "+errorMessage);
    return (
      <div className={className}>
        <label classname={s.label} htmlFor={this.props.name}>
        <span>{this.props.title} </span>
        </label>
        <input classname={s.input}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

const Login = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  submit(data) {
    alert(JSON.stringify(data, null, 4));
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  render() {
    return (
      <div className={s.root}>
    <div className={s.container}>
      <h1>{title}</h1>
      <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login" method="post" action="verifypass">
        <MyInput name="email" classname={s.input} title="Email" validations="isEmail" validationError="This is not a valid email" required />
        <br></br>
        <br></br>
        <MyInput name="password" classname={s.input} title="Password" type="password" required />
        <br></br>
        <div className={s.button}>
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </div>
      </Formsy.Form>
      </div>
    </div>
    );
  }
});
//React.render(<Login />, document.getElementById('app'));
/*function Login(props, context) {
  context.setTitle(title);
return (
  <div className={s.root}>
    <div className={s.container}>
      <h1>{title}</h1>
      <script src="./scripts/checkinput.js"></script>

      <form name="form1" method="get" action="verifypass" >
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="usernameOrEmail">
            Username or email address:
          </label>
          <input
            className={s.input}
            id="usernameOrEmail"
            type="text"
            name="usernameOrEmail"
            autoFocus
            />
        </div>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="password">
            Password:
          </label>
          <input
            className={s.input}
            id="password"
            type="password"
            name="password"

            />

        </div>
        <div className={s.formGroup}>
          <button className={s.button}    onClick="ValidateEmail()" value="submit" type="submit" >
            Log in
          </button>

          <Link  to="/forgotpass">Forgot Password</Link>
          <span className={s.spacer}> | </span>
          <Link  to="/register">Sign Up</Link>
        </div>
      </form>
</div>
    </div>
  
  );
}*/


Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);

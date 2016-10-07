/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';

const title = 'New User Registration';
var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var currentdate = day + '/' + month + '/' + year;
console.log("Date: "+currentdate);


function Register(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <form name="form1" method="put" action="savecustomer" >
          <div classname= {s.leftContainer} >
          <input id="modifieddate" type="hidden"  value={currentdate} name="modifieddate" />
            <label className={s.label} htmlFor="firstname">
              User First Name:
              
            </label>
            <input
              className={s.input}
              id="firstname"
              type="text"
              name="firstname"
              autoFocus
              required
              />
          </div>
          <div classname= {s.rightContainer}>
            <label className={s.label} htmlFor="Last Name">
              <span>User Last Name: </span>
            </label>
            <input
              className={s.input}
              id="lname"
              type="text"
              name="lname"
              required
              />
          </div>

          <div>
            <label className={s.label} htmlFor="address">
              <span>User Address: </span>
            </label>
            <input
              className={s.input}
              id="address"
              type="text"
              name="address"
              required
              />
            <label className={s.label} htmlFor="city">
              <span>City: </span>
            </label>
            <input
              className={s.input}
              id="city"
              type="text"
              name="city"
              required
              />
            <label className={s.label} htmlFor="zipcode">
              <span>Zipcode: </span>
            </label>
            <input
              className={s.input}
              id="zipcode"
              type="number"
              name="zipcode"
              required
              />
          </div>

          <div className={s.formGroup} >
            <label className={s.label} htmlFor="email">
              E-mail:
            </label>
            <input
              className={s.input}
              id="email"
              type="email"
              name="email"
              required
              />
            <label className={s.label} htmlFor="Phone">
              phone:
            </label>
            <input
              className={s.input}
              id="phone"
              type="text"
              name="phone"
              required
              />
          </div>
          <div className={s.formGroup}>
            <button className={s.button}    value="submit" type="submit" >
              Register
            </button>

          </div>
        </form>


      </div>
    </div>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);

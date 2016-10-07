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
import s from './Serviceprovider.css';

const title = 'Service Provider Registration';


var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var currentdate = day + '/' + month + '/' + year;

function Serviceprovider(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>{title}</h2>
        <form name="form1" method="put" action="saveprovider" >
          <div className= {s.leftContainer} >
          <input id="modifieddate" type="hidden"  value={currentdate} name="modifieddate" />
            <label className={s.label} htmlFor="firstname">
              User First Name:
            </label>
            <input
              className={s.input}
              id="firstname"
              type="text"
              name="firstname"
              placeholder="First Name"
              autoFocus
              required
              />
          
            <label className={s.label} htmlFor="Last Name">
              <span>User Last Name: </span>
            </label>
            <input
              className={s.input}
              id="lname"
              type="text"
              name="lname"
              placeholder="Last Name"
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
              placeholder="Address"
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
              placeholder = "City"
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
              placeholder="Zipcode"
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
              placeholder="Your E-mail"
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
              placeholder="Mobile Number"
              required
              />
          </div>
          <div className={s.formGroup} >
            <label className={s.label} htmlFor="servicetype">
              Service Type:
            </label>
            <input
              className={s.input}
              id="servicetype"
              type="servicetype"
              name="servicetype"
              placeholder="Service Type Catering, Astrology etc."
              required
              />
            </div>
            
            <div>
            <label className={s.label} htmlFor="serve">
              Serve Outside:
            </label>
            <input className={s.squaredOne}
              id="serveoutside"
              type="checkbox"
              name="serveoutside"
              
              />
          </div>
          <div className={s.formGroup}>
            <button className={s.button}    value="submit" type="submit" >
              Save
            </button>

          </div>
        </form>


      </div>
    </div>
  );
}

Serviceprovider.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Serviceprovider);

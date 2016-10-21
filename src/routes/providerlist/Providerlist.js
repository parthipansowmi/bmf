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
import s from './Providerlist.css';

const title = 'Service Provider Search';


function Providerlist({providerlist}, props, context) {
  console.log("Props: " + props)
  console.log("Context: " + context)
  console.log("providerlist: " + providerlist);
  context.setTitle(title);

 var obj = providerlist;
  //var $plist = $('#t');
  var providertable = "<table><thead><tr><th>Select</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Address</th><th>City</th><th>Phone</th></tr></thead>";
 for (var i = 0; i < obj.length; i++) {
    providertable = providertable + '<tr><td><input type="radio" name="provider"></td>';
    providertable = providertable + "<td>" + obj[i].email + "</td>";
    providertable = providertable + "<td>" + obj[i].firstname + "</td>";
    providertable = providertable + "<td>" + obj[i].lname + "</td>";
    providertable = providertable + "<td>" + obj[i].address + "</td>";
    providertable = providertable + "<td>" + obj[i].city + "</td>";
    providertable = providertable + "<td>" + obj[i].phone + "</td></tr>";
    
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1> {s.title}></h1>
        <p> Select Provider near by you</p>
        <div>
        {providertable}
        </div>
      </div>
    </div>
  );


}

Providerlist.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Providerlist);

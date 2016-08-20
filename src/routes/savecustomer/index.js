/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Savecustomer from './Savecustomer';
import { apihost } from '../../config';

var message = 'Sucessfully Registered';
var status = true;
var fn;
var ln;
var address;
var email;
var phone;
var zipcode;

export default {

  path: '/savecustomer',

  action({query}, {path}) {
    console.log("Query String: " + query);
    fn = query.firstname;
    console.log(fn);
    ln = query.lname;
    address = query.address;
    zipcode = query.zipcode;
    phone = query.phone;
    email = query.email;
    saveCustomerData();
    if (!status) {
      message = 'Error in Saving Customer Data';
    }
    return <Savecustomer message={message} />;
  },

};

function saveCustomerData() {
  var request = require('request');
  //console.log("Inside storePasscode method email: " + email);
  // console.log("Inside storePasscode method Code: " + code);
  console.log('calling API');
  var url = `http://${apihost}/addNewCustomer`;
  console.log("URL: " + url);
  request.post({ url: url, form: { firstname: firstname, lastname: ln, address: address, phone: phone, email: email, zipcode: zipcode } }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside saveCustomerData Response from API (body)' + body);

      if (body == 'true')
        status = true;
    }
    else {
      console.log("Error in storing customer data");
      status = false;
    }


  });
console.log('returning');
}

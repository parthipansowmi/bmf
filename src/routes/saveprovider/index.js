/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Saveprovider from './Saveprovider';
import Login from '../Login';
import { apihost, host } from '../../config';
var request = require('request');

var message = 'Sucessfully Registered. <a href="http://'+apihost+'/login" >Click here to login</a>';
var status = true;
var fn;
var ln;
var address;
var email;
var phone;
var zipcode;
var type;
var serve;
var message = 'Sucessfully Registered. '
var href =  `http://${host}/login`;
var message1= 'Click here to login'

export default {

  path: '/saveprovider',

  action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    path = '/';
    fn = query.firstname;
    console.log(fn);
    ln = query.lname;
    address = query.address;
    zipcode = query.zipcode;
    phone = query.phone;
    email = query.email;-
    SaveproviderData(query);
    if (!status) {
      message = 'Error in Provider Data';
      href = `http://${host}/serviceprovider`;
      message1= 'Click here to Register'
    }
    return <Saveprovider message={message} href={href} message1={message1} />;
    //return <Login />;
  },

};

function SaveproviderData(data) {
  var request = require('request');
  //console.log("Inside storePasscode method email: " + email);
  // console.log("Inside storePasscode method Code: " + code);
  console.log('calling API');
  var url = `http://${apihost}/addNewProvider`;
  console.log("URL: " + url);
  request.post(url, {form:  data}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside SaveproviderData Response from API (body)' + body);

      if (body == 'true')
      {
        status = true;
        url = `http://${apihost}/generatePass?length=6`;
        var password = getPassword(url);
        console.log("generated Password: "+password);
    }
    else {
      console.log("Error in storing customer data");
      status = false;
    }
    }

  });
  
console.log('returning');

}

function getPassword(url) {
  console.log("URL: " + url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('generate Password - Response from API' + body);
      saveLogin(body);
    }
    else {
      
      console.log("Get Password -API Server not running: ") + error;
      return '';
    }
  });
}

function saveLogin(password) {
  var data = { "email": email, "password": password};
  console.log("Data: "+data);
  var url = `http://${apihost}/addlogin`;
  //var url = `http://${apihost}/addproviderlogin';
  request.post(url, { form: data },function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('saveLogin Password - Response from API' + body);
      status = true;
    }
    else {
      status = false;
      console.log("Change Password -API Server not running: ") + error;
    }
  });
}
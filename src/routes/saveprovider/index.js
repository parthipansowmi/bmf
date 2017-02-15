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
/*var fn;
var ln;
var address;

var phone;
var zipcode;
var type;
var serve;*/

var email;
var message = 'Sucessfully Registered. '
var href =  `http://${host}/providerlogin`;
var message1= 'Click here to login';
var password;

export default {

  path: '/saveprovider',

 async action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    path = '/';
    /*fn = query.firstname;
    console.log(fn);
    ln = query.lname;
    address = query.address;
    zipcode = query.zipcode;
    phone = query.phone;*/
    email = query.email;

    var result = await SaveproviderData(query);
    console.log("Status -- SaveproviderData: "+status);
    if ( status )
     {
        password = await getPassword();
        console.log("Status -- getPassword: "+status);
        if (status)
          var savelogin = await saveLogin(password);
          var emailstatus = sendEmail();
     }
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

  return new Promise(function(resolve, reject) {
  request.post(url, {form:  data}, function (error, response, body) {

    if ( error)
      return reject(error);
    if (!error && response.statusCode == 200) {
      console.log('Inside SaveproviderData Response from API (body)' + body);
      if (body == 'true')
      {
        status = true;        
     }
    else {
      console.log("Error in storing customer data");
      status = false;
    }
    resolve(body);
    }
      console.log('returning');
  });

});
}

function getPassword() {
  var url = `http://${apihost}/generatePass?length=6`;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('generate Password - Response from API' + body);
      resolve(body);
    }
    else {
      
      console.log("Get Password - API Server not running: ") + error;
      return reject(error);
    } 
  });

  });
}

function saveLogin(password) {
  var data = { "email": email, "password": password};
  console.log("Data: "+data);
  var url = `http://${apihost}/addlogin`;
  //var url = `http://${apihost}/addproviderlogin';
  return new Promise(function(resolve, reject) {
  request.post(url, { form: data },function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('saveLogin Password - Response from API' + body);
      status = true;
      resolve(body);
    }
    else {
      status = false;
      console.log("Change Password -API Server not running: ") + error;
      return reject(error);
    }
  });
  });
}

function sendEmail() {
  console.log('calling API - sendEmail');
  var url = `http://${apihost}/sendmail`;
  console.log("URL: " + url);

  var subject = "Your Registration for our service";
  var message = "<b>Thank you for Register. </b> <br> <b> Assuring best service. Your password for login is: "+password+"<b> ";
  var formdata = { 
  tomail: email, 
  subject: subject, 
  message: message
};
  
  //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
  console.log("Data: "+formdata);
  return new Promise(function(resolve, reject) {
  request.post(url, { form: formdata }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside sendEmail - Response from API (body)' + body);

      if (body == 'true')
        resolve(body)
        status = true;
    }
    if (error) {
      console.log("Error in Sending Mail");
      status = false;
      return reject(error);
    }

  });
   });
}
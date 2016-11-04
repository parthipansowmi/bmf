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
import Login from '../Login';
import { host, apihost } from '../../config';
var request = require('request');

var message = 'Sucessfully Registered. '
var href = `http://${host}/login`;
var message1 = 'Click here to login'
var status = true;
var fn;
var ln;
var address;
var email;
var phone;
var zipcode;
var password;

export default {

  path: '/savecustomer',

 async action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    
    path = '/';
    fn = query.firstname;
    console.log(fn);
    ln = query.lname;
    address = query.address;
    zipcode = query.zipcode;
    phone = query.phone;
    email = query.email;
    var body = await checkDuplicate(email);
    console.log("Response: "+body);
    if ( body == 'false')
     {
      var customerdata = await saveCustomerData(query);
      console.log("Customerdata: "+customerdata);
      console.log("Status--saveCustomerData: "+status);
      if ( customerdata == 'true')
      {
        password = await getPassword();
        console.log("generated Password: "+password);
        console.log("Status--getPassword: "+status);
        var login = await saveLogin(password);      
      }
       
     }
    
      if (!status) {
        message = 'Error in Saving Customer Data';
        href = `http://${host}/register`;

        message1 = 'Click here to Register.';
      }
      console.log("Href: " + href);
      return <Savecustomer message={message} redirectlink={href} message1={message1} />;
  
  }

};

function checkDuplicate(email)
{
  var url = `http://${apihost}/getCustomer?email=`+email;
  console.log("URL: checkDuplicate " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Check duplicate - Response from API' + body);
      
      if ( body == 'true' )
        {
           message = 'Email id already register';
           status = 'false';
        }
      
      else
      {
           console.log("Customer email not exist");
           status='true';
      }
        resolve(body);
    }
    else {
      
      console.log("Check duplicate - Error in getting customer ") + error;
      return reject(error);
    }
  });
  console.log("Checkduplicate -- Returning")
  });
}


function saveCustomerData(data) {
 // var request = require('request');
  console.log('saveCustomerData -- calling API');
  //var request = require('request-promise');
  var url = `http://${apihost}/addNewCustomer`;
  console.log("saveCustomerData -- URL: " + url);

  return new Promise(function(resolve, reject) {
  request.post(url, { form: data }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside saveCustomerData Response from API (body)' + body);

      if (body == 'true') {
        status = true;
       
      }
      resolve(body);
    }
    else {
      console.log("saveCustomerData -- Error in storing customer data");
      status = false;
      return(error);
    }

  console.log('saveCustomerData -- returning from API call');
  });
  
  });
  
}

function getPassword() {
  var url = `http://${apihost}/generatePass?length=6`;
  console.log("getPassword -- URL: " + url);

  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getPassword --  Response from API' + body); 
      status='true';        
      resolve(body);
    }
    else {
      
      console.log("getPassword -- API Server not running: " + error);
      status = 'false';
      return(error);
    }
    console.log('getPassword -- returning from API call');
  });

});
}

function saveLogin(password) {
  var data = { "userEmail": email, "password": password};
  console.log("Data: "+data);
  var url = `http://${apihost}/addcred`;
  return new Promise(function(resolve, reject) {
  request.post(url, { form: data },function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('saveLogin Password - Response from API' + body);
      status = true;
      resolve(body);
    }
    else {
      status = false;
      console.log("saveLoging -API Server not running: ") + error;
      return(error);
    }
  });
});
}
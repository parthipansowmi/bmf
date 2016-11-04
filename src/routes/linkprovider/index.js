/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import LinkProvider from './LinkProvider';

import { host, apihost } from '../../config';


var message = 'Booking done Sucessfully  '
var href = `http://${host}/`;
var message1 = 'Click here to Home Page'
var status = true;


export default {

  path: '/linkprovider',

async  action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    var provideremail = query.provideremail;
    var customeremail = query.customeremail;
     var url = `http://${apihost}/updateProviderLink?provideremail=`+provideremail+'&email='+customeremail;
    console.log("Link Provider - Provider Email: "+provideremail);
    console.log("Link Provider - Customer Email: "+customeremail);
   console.log("URL: " + url);
   var result = await LinkProviderData(url);
   console.log("Return from LinkProviderData");
    if (!status) {
      message = 'Error in Saving Booking Data';
      href = `http://${host}/booking`;
      message1 = 'Click here to Re-booking';
    }
   
   return <LinkProvider message={message} redirectlink={href} message1={message1} />;
  },

};

function LinkProviderData(url) {
  var request = require('request');
 // console.log("APIHOST: "+apihost);
  console.log('calling API - LinkProviderData method');
  //console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
   request.put(url, function (error, response, body) {
     if (error) 
     {
      console.log("Error in storing provider data");
      status = false;
     return reject(error);     
     }
     
   if (body == 'true') {
      console.log('Inside LinkProviderData Response from API (body)' + body);      
        status = true;
      resolve(body);      
   }
    
  });
  console.log('returning');
 });
 }
 


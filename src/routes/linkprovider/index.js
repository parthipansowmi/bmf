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
import Login from '../login/Login';


var message = 'Booking done Sucessfully  '
var href = `http://${host}/`;
var message1 = 'Click here to Home Page'
var status = true;
var bookingid;


export default {

  path: '/linkprovider',

async  action({query}, {path}) {
    console.log("Query String - index.js - linkprovider: " + JSON.stringify(query));
    var provideremail = query.provideremail;
    var customeremail = query.customeremail;
    var providerphone;
    var bookingid = query.bookingid;
    var sessionid = query.sessionid;

    var providerrec = JSON.parse(await getProviderRecord(provideremail));
    console.log("Provider Record: "+providerrec);
    providerphone = providerrec[0].phone;
    console.log("Provider Phone: "+providerphone);
    console.log("Sessionid - index.js - Home "+sessionid);
       if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         return <Login sessionid = {body}/>
       }

    var url = `http://${apihost}/updateProviderLink?provideremail=`+provideremail+'&email='+customeremail+'&phone='+providerphone+'&bookingid='+bookingid;
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
   else
   {
     var mail =  sendEmail(customeremail, provideremail, bookingid);
     href=`http://${host}/home?sessionid=`+sessionid+'&email='+customeremail;
   }
      return <LinkProvider message={message} redirectlink={href} message1={message1} sessionid={sessionid}/>;
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
 
function getSessionid(email) {
  var request = require('request');
  console.log('genSessionid - calling API');
  var url = `http://${apihost}/genSessionid`;
  console.log("getSeesionid - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('genSessionid - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("genSessionid -API Server not running: "+error);
      return reject(error);
    }
    console.log("getSessionid - Returning from API call")
  });

 });
 
}

function getProviderRecord(email) {
  var request = require('request');
  console.log('getProviderRecord - linkProvider - calling API');
  var url = `http://${apihost}/getProvider?email=`+email;
  console.log("getSeesionid - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getProviderRecord - linkProvider - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("getProviderRecord - linkProvider -API Server not running: "+error);
      return reject(error);
    }
    console.log("getSessionid - Returning from API call")
  });

 });
 
}

function sendEmail(email, provideremail, bookingid) {
  var request = require('request');-
  console.log('calling API - sendEmail');
  var url = `http://${apihost}/sendmail`;
  console.log("URL: " + url);

  var subject = "Your booking for the event in BMY";
  var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> "+bookingid;
  var formdata = { 
  tomail: email+' ,'+provideremail, 
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
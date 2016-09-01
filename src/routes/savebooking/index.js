/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Savebooking from './Savebooking';
import Login from '../Login';
import { host, apihost, smsAPIKey, SMSmessage } from '../../config';
var request = require('request');

var message = 'Sucessfully Registered. '
var href = `http://${host}/login`;
var message1 = 'Click here to login'
var status = true;
var email;
var phone;
var zipcode;

export default {

  path: '/savebooking',

  action({query}, {path}) {
    console.log("Query String: " + JSON.stringify(query));
    phone = query.mobile;
    path = '/';
    SavebookingData(query);
    if (!status) {
      message = 'Error in Saving Customer Data';
      href = `http://${host}/register`;

      message1 = 'Click here to Register.';
    }
    console.log("Href: " + href);
    return <Savebooking message={message} redirectlink={href} message1={message1} />;
    //return <Login />;
  },

};

function SavebookingData(data) {

  console.log('calling API');
  var url = `http://${apihost}/newBooking`;
  console.log("URL: " + url);
  request.post(url, { form: data }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside SavebookingData Response from API (body)' + body);

      if (body == 'true')
        status = true;
        sendSMS();
    }
    else {
      console.log("Error in storing customer data");
      status = false;
    }

  });
  console.log('returning');
}

function sendSMS() {
  console.log('calling API');
  
  var url = `http://${apihost}/sendSMS?authkey=`+ smsAPIKey+'&mobiles='+ phone +'&message='+SMSmessage+'&sender=DTSBMF&route=4&country=91';
  console.log("URL: " + url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside SavebookingData Response from API (body)' + body);

      if (body == 'true')
        status = true;
    }
    else {
      console.log("Error in Sending SMS");
      status = false;
    }

  });
}
import React from 'react';
import ConfirmOTP from './ConfirmOTP';
import { host, apihost, smsAPIKey } from '../../config';

var request = require('request');
var status = true;
var message = 'Password Sucessfully Updated'
var href = `http://${host}/providerlogin`;
var message1 = 'Click here to login'
var otp;
var SMSmessage;
var email;


export default {

  path: '/confirmOTP',

 async action({query}, {path}) {

    email = query.email;
    var oldphone = query.oldphone;
    var newphone = query.newphone;
    
    otp = Math.floor(1000000 + Math.random() * 9000000);
    console.log("OTP - Update phone module:"+ otp);

    SMSmessage = " You are requested for mobile number change. Use this OTP "+otp;

       
    //var SMS = await sendSMS(newphone);
    var OTP = await saveOTP();

     return <ConfirmOTP email={email} newphone={newphone} />
  }

};

function sendSMS(newphone) {
  console.log('calling API - sendSMS method');
  
  var url = `http://${apihost}/sendSMS?authkey=`+ smsAPIKey+'&mobiles='+ newphone +'&message='+SMSmessage+'&sender=DTSBMF&route=4&country=91';
  console.log("URL: " + url);
   return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside sendSMS - Response from API (body)' + body);

   if (error) {
      console.log("Error in Sending SMS");
      status = false;
      return reject(error);
    }

  if (body == 'true')
        status = true;
        resolve(body)
    }
    
      });
   });
}

function saveOTP() {
  
  console.log("Inside saveOTP method email: " + email);
  console.log("Inside saveOTP method Code: " + otp);
  console.log('calling API');
  var url = `http://${apihost}/addOTP`;
  console.log("URL - saveOTP: " + url);

  var formdata = { 
  email: email, 
  otp: otp
};

  return new Promise(function(resolve, reject) {
  request.post(url, {form:  formdata}, function (error, response, body) {

    if ( error)
      return reject(error);
    if (!error && response.statusCode == 200) {
      console.log('Inside saveOTP Response from API (body)' + body);
      if (body == 'true')
      {
        status = true;        
     }
    else {
      console.log("Error in storing OTP data");
      status = false;
    }
    resolve(body);
    }
      console.log('returning');
  });

});
}


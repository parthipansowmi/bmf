import React from 'react';
import Provideforgotpass from './Providerforgotpass';
import Providerlogin from '../providerlogin/Providerlogin'
import { apihost, host } from '../../config';
var request = require('request');

var status = 'false';
var errormessage = '';
//var user;

export default {

  path: '/providerforgotpass',

  async action({query}, {path}) {
    var email = query.email;
  // user = query.user;

    console.log("Email ID:" + email);
   // console.log("User: "+user);

    if (typeof email === 'undefined')
      return <Provideforgotpass />;
    else {

        var  validlogin = await checkLogin(email);
        console.log("ValidLogin:"+validlogin);
        if ( validlogin == 'true')
        {
        var code = passwordCode(6);
        console.log("Passcode: "+code);
        var body = await sendEmail(email, code);
        if (body == 'true')
          var result = await storePasscode(email, code);
        }

    }
    console.log("Status: "+status);
    if (status == true)
    {
      console.log("Redirected to Login Page");
      return <Providerlogin />;
    }      
    else
    {
      console.log("Error in Reseting password request");
      return <Providerforgotpass errormessage={errormessage} />;
    }
      
  }

};

function sendEmail(email, code) {
  console.log('calling API - sendEmail');
  var url = `http://${apihost}/sendmail`;
  console.log("URL: " + url);

  var subject = "Your Password Reset";
  var href = `http://${host}/providerchangepassword?code=`+code+'&userEmail='+email;
  console.log("Href: "+href);
  var message = '<b>We received your request for password Reset. <a href="'+href+ '" >Click here to reset password</a> ';
  var formdata = { 
  tomail: email, 
  subject: subject, 
  message: message
};
     
  console.log("Data: "+formdata);
  return new Promise(function(resolve, reject) {
  request.post(url, { form: formdata }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside sendEmail - Response from API (body)' + body);

      if (body == 'true')
        status = true;
      else 
        status = false;
        resolve(body);        
    }
    else if (error) {
      console.log("Error in Sending Mail");
      status = false;
      return reject(error);
    }

  });
   });
}

function passwordCode(length) {
  var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^*()-+<>ABCDEFGHIJKLMNOP1234567890";
  var pass = "";
  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }
  return pass;
}

function storePasscode(email, code) {
  
  console.log("Inside storePasscode method email: " + email);
  console.log("Inside storePasscode method Code: " + code);
  console.log('calling API');
  var url = `http://${apihost}/storePasscode`;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
  request.post(url, { form: { email: email, code: code } }, function (error, response, body) {
    if (!error && response.statusCode == 200 ) {
      console.log('Inside StorePasscode Response from API (body)' + body);
      
      if ( body == 'true')
      status = true;
      resolve(body);
    }
    else {
      console.log("Error in storing passcode");
      status = false;
      return reject(error);
    }
  });
  
  });

}

function checkLogin(email) {
  
  console.log('calling API');
  
  var url = `http://${apihost}/checkemail?email=` + email;  
  console.log("URL: " + url);

  return new Promise(function (resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Response from API: ' + body);
      if ( body == 'true')
        status = true;
      resolve(body);
    }
    else {
      status = 'false';
      console.log("API Server not running: "+error);
      return reject(error);
    }
    console.log('Returning')
  });

  });
}
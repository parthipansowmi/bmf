import React from 'react';
import Forgotpass from './Forgotpass';
import Login from '../Login';
import { apihost } from '../../config';
var status = true;
var validLogin = false;
export default {

  path: '/forgotpass',

  action({query}, {path}) {
    var email = query.email;

    console.log("Email ID:" + email);
    if (typeof email === 'undefined')
      return <Forgotpass />;
    else {

        validLogin = checkLogin(email);
    }
    console.log("Status: "+status);
    if (status == true)
    {
      console.log("Redirected to Login Page");
      return <Login />;
    }      
    else
    {
      console.log("Error in Reseting request");
return <Forgotpass />;
    }
      
  }

};

function sendEmail(email) {
  var nodemailer = require('nodemailer');
  var code = passwordCode(6);
  var transporter = nodemailer.createTransport('smtps://dreamtruesolution%40gmail.com:sowmi6050@smtp.gmail.com');
  console.log("SendEmail Code: " + code);
  // setup e-mail data with unicode symbols 
  var mailOptions = {
    from: 'dreamtruesolution@gmail.com', // sender address 
    to: email, // list of receivers 
    subject: 'Password Reset ', // Subject line 
    text: 'Password Reset Mail ', // plaintext body 
    html: '<b>We received your request for password Reset. </b> <a href="http://localhost:3000/changepassword?code=' + code + '&userEmail=' + email + '"' + 'target="_blank">click here to reset the password</a>'// html body 
  };

  // send mail with defined transport object  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error Message' " + error);
      status = false;
    }
    else {
      status = true;
      console.log('Message sent: ' + info.response);
      storePasscode(email, code);
    }

  });
  console.log("returning");
}

export function passwordCode(length) {
  var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  var pass = "";
  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }
  return pass;
}

function storePasscode(email, code) {
  var request = require('request');
  console.log("Inside storePasscode method email: " + email);
  console.log("Inside storePasscode method Code: " + code);
  console.log('calling API');
  var url = `http://${apihost}/storePasscode`;
  console.log("URL: " + url);
  request.post(url, { form: { email: email, code: code } }, function (error, response, body) {
    if (!error && response.statusCode == 200 ) {
      console.log('Inside StorePasscode Response from API (body)' + body);
      
      if ( body == 'true')
      status = true;
    }
    else {
      console.log("Error in storing passcode");
      status = false;
    }


  });

}

async function checkLogin(email) {
  var request = require('request');
  console.log('calling API');
  var url = `http://${apihost}/findemail?email=` + email;
  console.log("URL: " + url);
  //return new Promise(function (resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Response from API' + body);
      if ( body == 'true') {
      sendEmail(email);
    }
      //return resolve(body);
    }
    else {
      status = false;
      console.log("API Server not running: ")+error;
    }


  });
  //});
}
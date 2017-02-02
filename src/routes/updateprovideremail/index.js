import React from 'react';
import Updateprovideremail from './Updateprovideremail';

import {host, apihost } from '../../config';
var status = true;
var message = 'Email Sucessfully Updated'
var href;
var message1 = 'Click here to login'
var passcode; 
var request = require('request');

export default {

  path: '/updateprovideremail',

 async action({query}, {path}) {
    console.log("Query: "+query);
    var email = query.oldemail;
    var newemail = query.newemail;
    passcode = query.code;

    console.log("Current Email: " + email);
    console.log("New Email: " + newemail);
    console.log("Passcode - Update Email module:"+ passcode);
    
    if ( passcode == "activate")
    {
      var body = await updateEmail(email, newemail);
      var login = await updatelogin(email, newemail);
      if ( status == false)
         message = ' Error in updating email';
      else
      {
         message = 'Email  Sucessfully Updated'; 
      }
      message1= 'click here to login with new email';
      href = `http://${host}/providerlogin`;
    }
    else
    {
      href = `http://${host}/updateprovideremail?code=activate&newemail=`+newemail+'&oldemail='+email;
      console.log("Verify: href:"+href);
      var mail = await sendEmail(newemail);
      message = "Confirmation mail sent to your new email. ";
      message1 = "Click here to relogin" 
      href = `http://${host}/providerlogin`;    
    }   
    
     return <Updateprovideremail message={message} message1={message1} redirectlink={href}/>
  }

};


function updateEmail(email, newemail) {
  
  console.log("Inside Updateprovideremailword method email: " + email);
  console.log("Inside Updateprovideremailword method New Email: " + newemail);
  console.log('calling API');
  var url = `http://${apihost}/updateEmail?email=`+email+'&newemail='+newemail;
  console.log("Update Updateprovideremail updateEmail - URL: " + url);

  return new Promise(function(resolve, reject) {
  
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Update Email - Updateprovideremail - Response from API' + body);
      if ( body == 'true') {
            status = true;
          }
      else
      {
        status = false;
        message = 'Error in updating email';
      }
       resolve(body);
    }
  else {
      status = false;
      console.log("Updateprovideremail - API Server not running: ")+error;
      return reject(error);
    }
  });

  });

}

function sendEmail(email) {
  console.log('calling API - sendEmail');
  var url = `http://${apihost}/sendmail`;
  console.log("URL: " + url);

  var subject = "Your request for change Email";
  var message = "<b>You have requested for email change . Click below link to verify to activate email </b> <br> <b> <a href='"+href+ "' >Please click the link to activate email</a>  <b> ";
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

function updatelogin(email, newemail) {
  
  console.log("Inside updatelogin method email: " + email);
  console.log("Inside updatelogin method New Email: " + newemail);
  console.log('calling API');
  var url = `http://${apihost}/updatelogin?email=`+email+'&newemail='+newemail;
  console.log("Update Updateprovideremail updatelogin - URL: " + url);

  return new Promise(function(resolve, reject) {
  
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Update Login - Updateprovideremail - Response from API' + body);
      if ( body == 'true') {
            status = true;
          }
      else
      {
        status = false;
        message = 'Error in updating password';
      }
       resolve(body);
    }
  else {
      status = false;
      console.log("Updateprovideremail - updatelogin - API Server not running: ")+error;
      return reject(error);
    }
  });

  });

}
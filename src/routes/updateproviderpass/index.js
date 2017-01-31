import React from 'react';
import Updateproviderpass from './Updateproviderpass';
import Providerchangepassword from '../providerchangepassword/Providerchangepassword';
import {host, apihost } from '../../config';
var status = true;
var message = 'Password Sucessfully Updated'
var href = `http://${host}/providerlogin`;
var message1 = 'Click here to login'
var passcode; 

export default {

  path: '/updateproviderpass',

 async action({query}, {path}) {

    var email = query.email;
    var newpass = query.newpass;
    var confirmpass = query.confirmpass;
    passcode = query.code;
    console.log("Email ID:" + email);
    console.log("New Password: " + newpass);
    console.log("Confirm Password: " + confirmpass);
    console.log("Passcode - Update Password module:"+ passcode);
    if ( newpass != confirmpass)
     {
       message = "Password Not matching"
       return <Providerchangepassword email ={email} message={message}/>;
     } 
    
    var body = await updatePassword(newpass, email);
    if ( status = false)
      message = ' Error in updating password';
    else
     {
      message = 'Password Sucessfully Updated';
      var deletecode = await deletePassCode();
     }
      
     return <Updateproviderpass message={message} message1={message1} redirectlink={href}/>
  }

};


function updatePassword(newpass, email) {
  var request = require('request');
  console.log("Inside Updateproviderpassword method email: " + email);
  console.log("Inside Updateproviderpassword method Password: " + newpass);
  console.log('calling API');
  var url = `http://${apihost}/updatelogin?newpass=`+newpass+'&email='+email;
  console.log("Update Updateproviderpass Password - URL: " + url);

  return new Promise(function(resolve, reject) {
  
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Change Password - Updateproviderpass - Response from API' + body);
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
      console.log("Updateproviderpass - API Server not running: ")+error;
      return reject(error);
    }
  });

  });

}

function deletePassCode() {
  var request = require('request');
  console.log('Check Code - calling API');
  var url = `http://${apihost}/removeCode?code=` +passcode;
  console.log("deletePassCode - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request.delete(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('deletePassCode- Response from API' + body);

      if ( body == 'true')
          status = true;
      else
          status = false;
     resolve(body);
    }
    else {
      status = false;
      console.log("deletePassCode -API Server not running: "+error);
      return reject(error);
    }
    console.log("deletePassCode - Returning from API call")
  });

 });
 
}
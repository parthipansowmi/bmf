import React from 'react';
import Updatepass from './Updatepass';
import Changepassword from '../changepassword/Changepassword';
import { apihost } from '../../config';
var status = true;
var message = 'Password Sucessfully Updated'
var passcode; 

export default {

  path: '/updatepass',

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
       return <Changepassword email ={email} message={message}/>;
     } 
    
    var body = await updatePassword(newpass, email);
    if ( status = false)
      message = ' Error in updating password';
    else
     {
      message = 'Password Sucessfully Updated';
      var deletecode = await deletePassCode();
     }
      
     return <Updatepass message={message}/>
  }

};


function updatePassword(newpass, email) {
  var request = require('request');
  console.log("Inside updatePassword method email: " + email);
  console.log("Inside updatePassword method Password: " + newpass);
  console.log('calling API');
  var url = `http://${apihost}/updatecred?newpass=`+newpass+'&email='+email;
  console.log("Update Password - URL: " + url);

  return new Promise(function(resolve, reject) {
  
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Change Password - Response from API' + body);
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
      console.log("Change Password -API Server not running: ")+error;
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
import React from 'react';
import Updatepass from './Updatepass';
import Changepassword from '../Changepassword';
import { apihost } from '../../config';
var status = true;
var message = 'Password Sucessfully Updated'

export default {

  path: '/updatepass',

 async action({query}, {path}) {

    var email = query.email;
    var newpass = query.newpass;
    var confirmpass = query.confirmpass;
    console.log("Email ID:" + email);
    console.log("New Password: " + newpass);
    console.log("Confirm Password: " + confirmpass);
    if ( newpass != confirmpass)
    return <Changepassword />;
    updatePassword(newpass, email);
    if ( status = false)
      message = ' Error in updating password';
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

    }
  else {
      status = false;
      console.log("Change Password -API Server not running: ")+error;
    }
  });

}


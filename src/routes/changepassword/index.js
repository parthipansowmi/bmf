import React from 'react';
import Changepassword from './Changepassword';
import { apihost } from '../../config';
var status = true;

export default {

  path: '/changepassword',

  action({query}, {path}) {

    var email = query.userEmail;
    var code = query.code;
    console.log("Email ID:" + email);
    checkCode(code, email);
    return <Changepassword email={email}/>;
  },

};

function checkCode(code, email) {
  var request = require('request');
  console.log('Check Code - calling API');
  var url = `http://${apihost}/getCode?code=` +code+'&userEmail='+email;
  console.log("Change Password -URL: " + url);
  
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Change Password - Response from API' + body);

      if ( body == 'true') {
      //updatePassword();
      status = true;
    }
   
    }
    else {
      status = false;
      console.log("Change Password -API Server not running: ")+error;
    }
  });
 
}




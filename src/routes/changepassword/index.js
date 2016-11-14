import React from 'react';
import Changepassword from './Changepassword';
import Login from '../login/Login';
import { apihost } from '../../config';
var status = false ;


export default {

  path: '/changepassword',

  async action({query}, {path}) {

    var email = query.userEmail;
    var code = query.code;
    console.log("Email ID:" + email);
    var startdate = new Date();
    var body = await checkCode(code, email);
    var enddate = new Date();
    var difftime = enddate.getTime()-startdate.getTime();
   console.log("Execution Time:"+ difftime);
    if ( status )     
      return <Changepassword email={email} />;
    else
     return <Login />;

  },

};

function checkCode(code, email) {
  var request = require('request');
  console.log('Check Code - calling API');
  var url = `http://${apihost}/getCode?code=` +code+'&userEmail='+email;
  console.log("Checkcode - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Checkcode - Response from API' + body);

      if ( body == 'true')
          status = true;
      else
          status = false;
     resolve(body);
    }
    else {
      status = false;
      console.log("checkCode -API Server not running: "+error);
      return reject(error);
    }
    console.log("Checkecode - Returning from API call")
  });

 });
 
}




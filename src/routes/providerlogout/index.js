import React from 'react';
import Logout from './Logout';
import Login from '../login/Login';
import { host, apihost} from '../../config';

var message = 'Thanks for visiting our website. You have Sucessfully Logged out '
var message1 = 'Click here to login';
var href = `http://${host}/login`;
var status;
var sessionid;

export default {

  path: '/logout',

 async action({query}, {path}) {
    sessionid = query.sessionid;
    console.log("Logout - index.js - Sessionid: "+sessionid);
    var body = await deleteSession();
    console.log("Session deleted");
    return <Logout message={message} redirectlink={href} message1={message1} />;
    //return <Login />;
   
  },

};

function deleteSession() {
var request = require('request');
  console.log('calling API - DeleteSession method');
  var url = `http://${apihost}/deleteSession?sessionid=`+sessionid;
  console.log("URL: " + url);

return new Promise(function(resolve, reject) {
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside Logout - index.js - deleteSession Response from API (body)' + body);

      if (body == 'true')
        status = true;
        resolve(body);
        
    }
    if (error) {
      console.log("Error in deleting session data");
      status = false;
      return reject(error);
    }
     console.log('returning from deleteSession API call');
  });
 
  
   });
}


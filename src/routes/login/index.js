import React from 'react';
import Login from './Login';
import { apihost } from '../../config';
var sessionid='';

export default {

  path: '/login',

 async action() {
    var body = await getSessionid();
    console.log("SessionId-Login: "+sessionid);
    return <Login sessionid = {sessionid}/>;
  },

};

function getSessionid() {
  var request = require('request');
  console.log('genSessionid - calling API');
  var url = `http://${apihost}/genSessionid`;
  console.log("getSeesionid - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('genSessionid - Response from API' + body);
      sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("genSessionid -API Server not running: "+error);
      return reject(error);
    }
    console.log("getSessionid - Returning from API call")
  });

 });
 
}
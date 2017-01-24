import React from 'react';
import Providerlogin from './providerlogin';
import { apihost } from '../../config';

export default {

  path: '/providerlogin',

 async action() {

    var sessionid = await getSessionid();
    console.log("SessionId-Login: "+sessionid);
    return <Providerlogin sessionid = {sessionid}/>;
   
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
      //sessionid = body;
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
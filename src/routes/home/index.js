
import React from 'react';
import Home from './Home';
import Login from '../login/Login'
import { apihost } from '../../config';

var sessionid;

export default {

  path: '/',

  async action({query}, {path}) {
    sessionid = query.sessionid;
    console.log("Sessionid - index.js - Home "+sessionid);
       if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         return <Login sessionid = {body}/>
       }        
       else
        return <Home  sessionid={sessionid}/>;
  },

};

function getSessionid() {
  var request = require('request');
  console.log('Home - genSessionid - calling API');
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
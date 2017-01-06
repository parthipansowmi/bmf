

import React from 'react';
import Booking from './Booking';
import Login from '../login/Login';
import { apihost } from '../../config';

export default {

  path: '/booking',

  async action({query}) {

    var date = new Date();
    var currentdate = date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear();
    var sessionid = query.sessionid;
    
    console.log("Booking Id: "+bookingid);
    console.log("Sessionid - index.js - Booking : "+sessionid);
       if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         console.log("Sessionid: "+body);
         return <Login sessionid = {body}/>
       }        
       else
        {
          var bookingid = Math.floor(1000000 + Math.random() * 9000000);
          return  <Booking sessionid={sessionid} bookingid={bookingid} />;
        }
        
    
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
     // sessionid = body;
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
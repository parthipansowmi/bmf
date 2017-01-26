
import React from 'react';
import Providerhome from './Providerhome';
import Providerlogin from '../providerlogin/Providerlogin'
import { apihost } from '../../config';

var sessionid;
var email;
var provider="provider";

export default {

  path: '/providerhome',

  async action({query}, {path}) {
    sessionid = query.sessionid;
    email=query.email;

    console.log("Sessionid - index.js - Providerhome "+sessionid);
       if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         return <Providerlogin sessionid = {body}/>
       }        
       else
       {
        var bookinglist = await getBookingData();
        return <Providerhome  sessionid={sessionid} bookinglist={bookinglist} email={email} provider={provider}/>;
       }
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

function getBookingData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/getbookingrecbyprovider?email=`+email;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
    request(url,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getBookingData Response from API (body)' + body);
      resolve(body);    
    }
    else
    {
      console.log("Error Object: "+error);
      return reject(error);
    }

  });

  });
}

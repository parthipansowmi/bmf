
import React from 'react';
import Providerlist from './Providerlist';
import { host, apihost } from '../../config';
import Login from '../login/Login';

 var providerlist;
 var sessionid;

export default {

  path: '/providerlist',

 async action({query}, {path}) {

   sessionid = query.sessionid;
   console.log("Sessionid - index.js - Home "+sessionid);
   if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         return <Login sessionid = {body}/>
       }
   var body = await getProviderData();
   //console.log("Body: "+body);
   var customeremail = query.customeremail;
   console.log("customer Email: "+customeremail);
  return <Providerlist providerlist={providerlist} customeremail={customeremail} sessionid = {sessionid} />;
 
  },

};

function getProviderData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/searchByType?servicetype=Pooja`;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
    request(url,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getProviderData Response from API (body)' + body);
      providerlist = body;
      console.log("Providerlist: "+providerlist);
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
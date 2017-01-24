
import React from 'react';
import Searchprovider from './Searchprovider';
import { host, apihost } from '../../config';
import Providerlist from '../providerlist/Providerlist';
import Login from '../login/Login';

 var providerlist;
 var sessionid;
 var category;

export default {

  path: '/searchprovider',

 async action({query}, {path}) {

   sessionid = query.sessionid;
   var customeremail = query.email;
   console.log("Sessionid - index.js - SearchProvider "+sessionid);
   if ( sessionid === undefined || sessionid == '')
       {
         var body = await getSessionid();
         return <Login sessionid = {body}/>
       }
   var searchterm = query.searchterm;
   category = query.category;
   console.log("Search Term: "+searchterm)
   console.log("Category: "+category);
   if ( searchterm == 'pincode')
      providerlist = await getProviderDataByPincode(category);
   else
     providerlist = await getProviderDataByCity(category);
   console.log("Body: "+body);
   
   console.log("customer Email: "+customeremail);
  return <Searchprovider providerlist={providerlist} customeremail={customeremail} sessionid = {sessionid} />;
 
  },

};

function getProviderDataByCity(searchterm) {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/searchbycity?city=`+category;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
    request(url,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getProviderData Response from API (body)' + body);
      //providerlist = body;
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

function getProviderDataByPincode(searchterm) {
  var request = require('request');
 
  console.log('calling API - getProviderDataByPincode');
   var url = `http://${apihost}/searchbypincode?pincode=`+category;
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
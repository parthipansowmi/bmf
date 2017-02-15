
import React from 'react';
//import Verifyproviderlogn from './Verifyproviderlogin';
import Providerlogin from '../providerlogin/Providerlogin';
import Providerhome from '../providerhome/Providerhome';

import ErrorPage from '../error/ErrorPage';
import { apihost } from '../../config';

var request = require('request');

var res;
var userEmail;
var password;
var validLogin=true;
var url;
var bookinglist;
var sessionid;

export default {

  path: '/verifyproviderlogin',

 async action({query}, {path} ) {

    console.log("inside the Verifyproviderlogin");
    console.log(JSON.stringify(query));
    console.log("Request query: "+query);
    userEmail = query.email;
    password = query.password;
    sessionid = query.sessionid;
    console.log(userEmail);
    console.log(password);
    console.log("Session Id: "+sessionid);
   
    console.log('calling checkLogin');
    var validlogin = await checklogin();
    console.log("Result from API call: "+validLogin)
     if (validLogin == 'true') {
      var sessiondatastatus = await SaveSessionData();
      console.log(" Going to Provider Home Page");
      var bookinglist = await getBookingData();
      return <Providerhome sessionid={sessionid} email={userEmail} bookinglist={bookinglist} />;
    }

    else {
      console.log(" Invalid Credential return to Login Page");
      return  <Providerlogin />;
    } 

  }

};

function checklogin()

{
 url = `http://${apihost}/verifylogin?email=` + userEmail + '&password=' + password;
    console.log("API Endpoing - checklogin : "+url);
  
   return new Promise(function(resolve, reject) {
   var results = request(url, function (error, response, query) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API - checklogin ' + query)
          validLogin = query;
          resolve(query);
        }
        else {
          console.log("Server not responding - checklogin");
          validLogin = false;
        }

      });
console.log("ValidLogin status: - checklogin" + validLogin);
});
    
}

function SaveSessionData() {

  console.log('calling API - SaveSessionData method');
  var url = `http://${apihost}/addSession`;
  console.log("URL: " + url);
  var createdate = new Date();
  var data = { 
  email: userEmail, 
  sessionid: sessionid, 
  creationdate: createdate
};
console.log("Data: "+data);
return new Promise(function(resolve, reject) {
  request.post(url, { form: data }, function (error, response, query) {
    if (!error && response.statusCode == 200) {
      console.log('Inside SaveSessionData Response from API (query)' + query);

      if (query == 'true')
        //status = true;
        resolve(query);
      
    }
    if (error) {
      console.log("Error in storing Session data");
     // status = false;
      return reject(error);
    }

  });
 
  console.log('returning');
   });
}

function getBookingData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/getbookingrecbyprovider?email=`+userEmail;
  console.log("URL: " + url);
  return new Promise(function(resolve, reject) {
    request(url,  function (error, response, query) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getBookingData Response from API (query)' + query);
      resolve(query);    
    }
    else
    {
      console.log("Error Object: "+error);
      return reject(error);
    }

  });

  });
}
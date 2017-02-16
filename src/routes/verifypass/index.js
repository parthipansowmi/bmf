
import React from 'react';
import VerifyPass from './Verifypass';
import Login from '../login/Login';
import ErrorPage from '../error/ErrorPage';
import Home from'../home/Home';
import { apihost, host } from '../../config';
import {getSessionid} from '../../scripts/util';

var request = require('request');

var res;
var userEmail;
var password;
var validLogin;
var url;
var page;
var status;
var sessionid;
export default {

  path: '/verifypass',

  async action({query}, {path} ) {

    console.log("inside the verifypass");
   
    userEmail = query.usernameOrEmail;
    password = query.password;
    sessionid = query.sessionid;
    console.log(userEmail);
    console.log(password);
    console.log("SessionId: ")+sessionid;
    if ( sessionid === undefined || sessionid == '')
       {
         var sessionbody = await getSessionid();
         return <Login sessionid = {sessionbody}/>
       }

    url = `http://${apihost}/checklogin?usernameOrEmail=` + userEmail + '&password=' + password;
    
    validLogin = await verifylogin(url);
    console.log("Result from API call: "+validLogin)
     if (validLogin == 'true') {
      var body = await SaveSessionData();
      console.log(" Going to Home Page");
      var bookinglist = await getBookingData();
      return <Home sessionid={sessionid} email={userEmail} bookinglist={bookinglist} />;
    }

    else {
      var message = "Invalid username or passowrd";
      console.log(" Invalid Credential return to Login Page");
      return  <Login sessionid={sessionid} message={message}/>;
    } 

  }
};

function verifylogin(url)
{
  console.log("URL -- veriylogin: "+url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API' + body)
          validLogin = body;
          resolve(body);
        }
        else {
          console.log("Server not responding");
          validLogin = false;
        }

     console.log("ValidLogin status: " + validLogin);
    });
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
  request.post(url, { form: data }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside SaveSessionData Response from API (body)' + body);

      if (body == 'true')
        status = true;
        resolve(body);
      
    }
    if (error) {
      console.log("Error in storing Session data");
      status = false;
      return reject(error);
    }

  });
 
  console.log('returning');
   });
}

function getBookingData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/getBookingHistory?email=`+userEmail;
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
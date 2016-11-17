
import React from 'react';
import VerifyPass from './Verifypass';
import Login from '../login/Login';
import ErrorPage from '../error/ErrorPage';
import Home from'../home/Home';
import { apihost } from '../../config';

var request = require('request');

var res;
var userEmail;
var password;
var validLogin;
var url;
var page;
export default {

  path: '/verifypass',

  async action({request}, {query}, {path} ) {

    console.log("inside the verifypass");
    var sess = request.session;
    //session.sessionid = query.sessionid;
    //console.log("Session ID: "+query.sessionid);
    userEmail = query.usernameOrEmail;
    password = query.password;
    console.log(userEmail);
    console.log(password);
    url = `http://${apihost}/checklogin?usernameOrEmail=` + userEmail + '&password=' + password;
    
    validLogin = await verifylogin(url);
    console.log("Result from API call: "+validLogin)
     if (validLogin == 'true') {
      console.log(" Going to Home Page");
      return <Home />;
    }

    else {
      console.log(" Invalid Credential return to Login Page");
      return  <Login />;
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
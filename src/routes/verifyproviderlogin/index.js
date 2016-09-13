
import React from 'react';
import Verifyproviderlogn from './Verifyproviderlogin';
import Providerlogin from '../providerlogin/Providerlogin';
import ErrorPage from '../error/ErrorPage';
import Home from'../home/Home';
import { apihost } from '../../config';

var req = require('request');
/*var Fiber = require('fibers');
var Future = require('fibers/future');
var req = Future.wrap(require('request'));*/
var res;
var userEmail;
var password;
var validLogin=true;
var url;

export default {

  path: '/verifyproviderlogin',

  action({query}, {path}) {

    console.log("inside the verifypass");
    //console.log(JSON.stringify(query));
    userEmail = query.email;
    password = query.password;
    console.log(userEmail);
    console.log(password);
   
    console.log('calling checkLogin');
    checklogin();
    if (validLogin) {
      console.log(" Going to Home Page");
      return <Home />;
    }

    else {
      console.log(" Invalid Credential return to Login Page");
      return <Providerlogin />;
    }

  }

};

function checklogin()

{
 url = `http://${apihost}/verifylogin?email=` + userEmail + '&password=' + password;
    console.log("API Endpoing: "+url);
  
   var results = req(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API' + body)
          validLogin = body;
        }
        else {
          console.log("Server not responding");
          validLogin = false;
        }

      });

    console.log("ValidLogin status: " + validLogin);
}
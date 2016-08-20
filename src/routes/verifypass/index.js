
import React from 'react';
import VerifyPass from './Verifypass';
import Login from '../login/Login';
import ErrorPage from '../error/ErrorPage';
import Home from'../home/Home';
import { apihost } from '../../config';

var request = require('request');
var Fiber = require('fibers');
var Future = require('fibers/future');
var req = Future.wrap(require('request'));
var res;
var userEmail;
var password;
var validLogin;
var url;
var page;
export default {

  path: '/verifypass',

  action({query}, {path}) {

    console.log("inside the verifypass");
    //console.log(JSON.stringify(query));
    userEmail = query.usernameOrEmail;
    password = query.password;
    console.log(userEmail);
    console.log(password);
    url = `http://${apihost}/checklogin?usernameOrEmail=` + userEmail + '&password=' + password;
    console.log(url);
    //console.log('calling API');

    // var checkLoginWithFuture = Future.wrap(checkLogin);

    var doFutureWork = function () {

      console.log("Inside the doFutureWork")
      //validLogin = body;
      var results = req(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API' + body)
          validLogin = body;
        }
        else {
          console.log("Server not responding");
          validLogin = false;
        }

      }).wait();

      console.log("ValidLogin status: " + validLogin);

    }.future();

    console.log('calling checkLogin');
    doFutureWork();
    //Fiber.yield();
    console.log("Done");
    if (validLogin) {
      console.log(" Going to Home Page");
      return <Home />;
    }

    else {
      console.log(" Invalid Credential return to Login Page");
      return <Login />;
    }

  }

};
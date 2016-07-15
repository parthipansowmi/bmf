
import React from 'react';
import VerifyPass from './Verifypass';
import Login from '../login/Login';
import ErrorPage from '../error/ErrorPage';
import Home from'../home/Home';
import { mongodbUrl } from '../../config';
//import getConnection from '../../scripts/util.js'
import Promise from 'bluebird';
//import MongoClient from 'mongodb';


var validEmail = false;
var userEmail;
var password;
var validLogin = true;
var dbError = false;
var errorMessage;
 var component;


export default {

  path: '/verifypass',

 action({query}, {path}) {

    console.log("inside the verifypass");
    userEmail = query.usernameOrEmail;
    password = query.password;
    console.log(userEmail);
    console.log(password);
    getConnection();
    // return <Home />;
  }

};


function getConnection() {
  var user;
  var pass;
  console.log("Inside init() Email: ", userEmail);
  console.log("Password: ", password);
  var url = mongodbUrl;

  var MongoClient = require('mongodb').MongoClient;
  console.log("DB URL: " + url);
  // Use connect method to connect to the Server 
  console.log("Trying Connecting to DB");
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(" Server is not running ");
      dbError = true;
      
    }
    else {
      dbError = false;
      //console.log(db);
      console.log("Connected correctly to server");
      checkLogin(db);

    }
checkError();
  });

}

function checkLogin(db) {
  var collection = db.collection('userProfile');
  console.log(db);
  collection.find({ "userEmail": userEmail, "password": password }).toArray(function (err, docs) {
    if (err) {
      console.log(" Error in opening collections");
      errorMessage = err.message;
      console.log("DB" + errorMessage);
      dbError = true;
      
    }
    else {
      console.log("Found the following records");
      console.log(docs);
      console.log("No. of Records: ", docs.length);

      if (docs.length == 1) //&& docs[0].userEmail == userEmail && docs[0].password == password)
        validLogin = true;
      else
        validLogin = false;
      console.log("Login Result-init(): " + validLogin);
      db.close();
      dbError = false;
      
    }
    checkError();
  });
}

function checkError() {
  console.log("DB Error" + dbError);
 
  if (dbError) {
    //return <Error error={errorMessage} />;
    throw new Error(errorMessage);
  }
  
  console.log("Login Result: action " + validLogin);
    if (!validLogin) {
      console.log("Invalid Login");
      //alert(" Invalid Login");
     return <Login />
    }

    else {
      console.log("Valid Login");
       return <Home />;
    }

}

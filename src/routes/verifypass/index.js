
import React from 'react';
import VerifyPass from './Verifypass';
import Login from '../login/Login';
import ErrorPage from '../error/ErrorPage';
import Home from'../home/Home';
import { mongodbUrl } from '../../config';
//import ValidateEmail from '../../scripts/checkinput.js'
import Promise from 'bluebird';
//import MongoClient from 'mongodb';


var validEmail = false;
var userEmail;
var password;
var validLogin=true;
var dbError = false;
var errorMessage;
var express = require('express');
var app = express();


export default {

  path: '/verifypass',

  action({query}, {path}) {

    console.log("inside the verifypass");
    userEmail = query.usernameOrEmail;
    password = query.password;
    console.log(userEmail);
    console.log(password);
    validEmail = ValidateEmail(userEmail);
    //console.log("ValidEmail: "+validEmail);
    if (validEmail && password != '') {
      console.log("inside if");
      init();
      console.log("DB Error" + dbError);
      if (dbError) {

        console.log("DB"+errorMessage);
        // path = '/error';
        //<Error error={errorMessage} />;
        throw new Error(errorMessage);
        //return <ErrorPage error={errorMessage} />;
      }
      else {
        console.log("Login Result: action " + validLogin);
        if (!validLogin) {
          console.log("Invalid Login");
          alert(" Invalid Login");
          return <Login />
        }

        else {
          console.log("Valid Login");
          //path = '/contact';

          return <Home />;
        }
      }

    }

    else {
      console.log("inside else");
      if (password == '' || password == null)
      {
        console.log("Enter the valid password");
        //alert("Password cann't be empty");
      }

      if (!validEmail)
        //alert("Enter Valid Email");
        console.log(" Enter Valild E-mail");
    }
    return <Login />;
  }

};

function ValidateEmail() {

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(arguments[0])) {
    console.log("valid Email");
    return (true);

  }
  else {
    console.log("Invalid Email");
    //alert("You have entered an invalid email address!");
    return (false);
  }
    

}


function init() {
  var user;
  var pass;
  console.log("Inside init() Email: ", userEmail);
  console.log("Password: ", password);


  //var MongoClient = require('mongodb').MongoClient;
  
  var url = mongodbUrl;

  var MongoClient = require('mongodb').MongoClient;
  console.log("DB URL: " + url);
  // Use connect method to connect to the Server 
  console.log("Trying Connecting to DB");
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(" Server is not running ");
      dbError = true;
      return;
    }
    dbError = false;
    console.log(db);
    console.log("Connected correctly to server");

  });
  var collection = db.collection('userProfile');
  collection.find({ "userEmail": userEmail, "password": password }).toArray(function (err, docs) {
    if (err) {
      console.log(" Error in opening collections");
      errorMessage = err.message;
      dbError = true;
      return;

    }
   console.log("Found the following records");
    console.log(docs);
    console.log("No. of Records: ", docs.length);

    if (docs.length == 1) //&& docs[0].userEmail == userEmail && docs[0].password == password)
      validLogin = true;
    else
      validLogin = false;
    console.log("Login Result-init(): " + validLogin);

    db.close();


  });

  // await new Promise(resolve => (db = MongoClient.connect(url)));
  /*var db;
  var MongoClient = require('mongodb-p').MongoClient;
  MongoClient.connect(url).then( 
    function (db) {
      console.log("Connected correctly to server");
      dbError = false;
      console.log(db);
      db.collection('userProfile').then(
     function (collection) {
       // Find some documents 
       console.log("Opening the collection-1");
       return collection.find({ "userEmail": userEmail, "password": password }).toArray();
     }
    
   ).then(
     function (docs) {
       console.log("Found the following records");
       console.log(docs);
       console.log("No. of Records: ", docs.length);
   
       if (docs.length == 1) //&& docs[0].userEmail == userEmail && docs[0].password == password)
         validLogin = true;
       else
         validLogin = false;
       console.log("Login Result-init(): " + validLogin);
   
       db.close();
     },
     function (err) {
       console.log("Could not find all documents: " + err.message);
       // console.log(" Error in opening collections");
       errorMessage = err.message;
       dbError = true;
       return;
     }
     );
    },
   function (err) {
      //console.log("Error connecting to server: " + err.message);
      errorMessage = err.message;
      console.log(errorMessage);
      console.log("DB server not running ");
      dbError = true;
      return true;
    }
)*/  

  
}

import React from 'react';
import Updateproviderphone from './Updateproviderphone';
import { host, apihost, smsAPIKey } from '../../config';

var status = true;
var message = ''
var href=`http://${host}/providerlogin`;
var message1 = '';
var code; 
var request = require('request');
var phone;
var newphone;
var email;
var otp;


export default {

  path: '/updateproviderphone',

 async action({query}, {path}) {
    console.log("Query: "+JSON.stringify(query));
   
    newphone = query.newphone;
    email = query.email;
    otp=query.otp;
    console.log("OTP: " + otp);
    console.log("New phone: " + newphone);
    console.log("Email: "+email);
    
    var otpres = await searchOTP();
     var deleteres;
    if ( otpres == 'true')
      {
        var updatestatus = await updatephone();
        deleteres = await deleteOTP();
      }
    console.log("Status: "+status);
    if (status)
      {    
        console.log("Inside the true");
        message = " Phone sucessfully updated";
        message1 = "Click here to home page";
        
      }
      else
      {   
        message = " Phone details not updated. An error occured";
        message1 = "Click here to relogin";
        
      }
  
    
     return <Updateproviderphone message={message} message1={message1} redirectlink={href}/>
  }

};


function updatephone() {
  
  console.log("Inside Updateproviderphone - updatephone method email: " + email);
  console.log("Inside Updateprovider- updatephone method New phone: " + newphone);
  console.log('calling API');
  var url = `http://${apihost}/updatephone?email=`+email+'&newphone='+newphone;
  console.log("Update Updateproviderphone updatephone - URL: " + url);

  return new Promise(function(resolve, reject) {
  
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Update phone - Updateproviderphone - Response from API' + body);
      if ( body == 'true') {
            status = true;
          }
      else
      {
        status = false;
        message = 'Error in updating phone';
      }
       resolve(body);
    }
  else {
      status = false;
      console.log("Updateproviderphone - API Server not running: ")+error;
      return reject(error);
    }
  });

  });

}

function searchOTP() {
  
  console.log("Inside searchOTP method email: " + email);
  console.log("Inside searchOTP method Code: " + otp);
  console.log('calling API');
  var url = `http://${apihost}/findOTP?email=`+email+'&otp='+otp;
  console.log("URL - searchOTP: " + url);

  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {

    if ( error)
      return reject(error);
    if (!error && response.statusCode == 200) {
      console.log('Inside searchOTP Response from API (body)' + body);
      if (body == 'true')
      {
        status = true;        
     }
    else {
      console.log("Error in searching OTP data");
      status = false;
    }
    resolve(body);
    }
      console.log('returning');
  });

});
}

function deleteOTP() {
  
  console.log("Inside deleteOTP method email: " + email);
  console.log("Inside deleteOTP method Code: " + otp);
  console.log('calling API');
  var url = `http://${apihost}/deleteOTP?otp=`+otp;
  console.log("URL - deleteOTP: " + url);

  
  return new Promise(function(resolve, reject) {
  request.delete(url, function (error, response, body) {

    if ( error)
      return reject(error);
    if (!error && response.statusCode == 200) {
      console.log('Inside deleteOTP Response from API (body)' + body);
      if (body == 'true')
      {
        console.log("Successfully deleted the OTP");
        status = true;        
     }
    else {
      console.log("Error in deleteing  OTP data");
      status = false;
    }
    resolve(body);
    }
      console.log('returning');
  });

});
}



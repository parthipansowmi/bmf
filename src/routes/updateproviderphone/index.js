import React from 'react';
import Updateproviderphone from './Updateproviderphone';
import { host, apihost, smsAPIKey } from '../../config';

var status = true;
var message = 'phone Sucessfully Updated'
var href=`http://${host}/providerlogin`;
var message1 = 'Click here to login'
var code; 
var request = require('request');
var phone;
var newphone;
var email;
var otp;


export default {

  path: '/updateproviderphone',

 async action({query}, {path}) {
    console.log("Query: "+query);
   
    newphone = query.newphone;
    email = query.email;
    otp=query.otp;
    console.log("E-mail : " + phone);
    console.log("New phone: " + newphone);

    
    var updatestatus = await updatephone();
    
    if (status == 'true')
      {      
        message = " Phone sucessfully updated";
        message1 = "Click here to relogin";
        
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





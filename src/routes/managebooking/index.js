import React from 'react';
import Cancelbooking from './Cancelbooking';
import Login from '../Login';
import { host, apihost, smsAPIKey } from '../../config';
var request = require('request');

var message = 'Booking done Sucessfully  '
var href = `http://${host}/`;
var message1 = 'Click here to login'
var status = true;


export default {

path: '/managebooking',

 async action({query}, {path}) {
    console.log("Query String - index.js - Cancelbooking: " + JSON.stringify(query));
   
    sessionid = query.sessionid;
    //console.log("Sessionid - index.js - Cancelbooking "+sessionid);

    if ( sessionid === undefined || sessionid == '')
       {
         var sessionbody = await getSessionid();
         return <Login sessionid = {sessionbody}/>
       }        
  
       
  
  
    if (!status) {
      message = 'Unable to cancelling  the Event';
      href = `http://${host}/`;
      message1 = 'Click here to Register.';
      
    }
    else
    {
      message = 'Sucessfully canceled  the Event';
      href = href=`http://${host}/home?sessionid=`+sessionid+'&email='+email;
      message1 = 'Click here to Home Page.';
    }
   return <Cancelbooking message={message} redirectlink={href} message1={message1} sessionid = {sessionid} />;
  },

};



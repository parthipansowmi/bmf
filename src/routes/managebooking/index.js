import React from 'react';
import Managebooking from './Managebooking';
import Login from '../login/Login';
import Cancelbooking from '../cancelbooking/Cancelbooking';
import { host, apihost, smsAPIKey } from '../../config';
import {getSessionid} from '../../scripts/util';

var request = require('request');

var message = 'Booking done Sucessfully  '
var href = `http://${host}/`;
var message1 = 'Click here to login'
var status = true;
var email;
var phone;
var providermobile;
var providermail;
var sessionid;
var id;
var bookingstatus;
var provider;


export default {

path: '/managebooking',

 async action({query}, {path}) {
    console.log("Query String - index.js - Managebooking: " + JSON.stringify(query));

    sessionid = query.sessionid;
    console.log("Sessionid - index.js - Manage Booking "+sessionid);

    if ( sessionid === undefined || sessionid == '')
       {
         var sessionbody = await getSessionid();
         return <Login sessionid = {sessionbody}/>
       }        
   
    email = query.email;
    id = query.bookingid;
    provider = query.provider; 
    console.log("Provider - Manageing Booking: "+provider);

    console.log("Email: "+email);
  
    var bookingrec = JSON.parse(await getBookingRecord());

    if ( query.manage == 'changedate')
      {
        console.log("Inside the changedate");
        var eventdate = bookingrec[0].functiondate;
        return <Managebooking sessionid = {sessionid} bookingid={id} eventdate={eventdate}/>
      }
      
    if ( query.manage == 'close')
      bookingstatus = "closed";
    else
      bookingstatus = "canceled";

    //var bookingrec = JSON.parse(await getBookingRecord());
    console.log("booking Record: "+bookingrec);
    providermobile = bookingrec[0].providerphone;
    phone = bookingrec[0].mobile;
    console.log("Customer Mobile: "+phone);
    providermail = bookingrec[0].provideremail;

    console.log("Provider Phone: "+providermobile);
    console.log("Provider Email: "+providermail);

           
    var body = await updatebookingstatus();
    console.log("Calling SendEmail");
    var mail = await sendEmail();
   // console.log("Calling sendSMS");
    //var sms = await sendSMS();
    console.log("Body: "+body);
    if (!status) {

      if ( bookingstatus == "canceled")
        message = 'Unable to cancelling  the Event';
      else
        message = 'Unable to close  the Event';
      href = `http://${host}/`;
      message1 = 'Click here to Register.';
      
    }
    else
    {
      if ( bookingstatus == "canceled")
        message = 'Sucessfully canceled  the booking';
      else
         message = 'Sucessfully closed the booking';
      if ( typeof provider != undefined)
       href = href=`http://${host}/providerhome?sessionid=`+sessionid+'&email='+email;
      else 
       href = href=`http://${host}/home?sessionid=`+sessionid+'&email='+email;
      message1 = 'Click here to Home Page.';
    }
   return <Cancelbooking message={message} redirectlink={href} message1={message1} sessionid = {sessionid} />;
  },

};


function updatebookingstatus() {

  console.log('calling API - updatebookingstatus method');
  var url = `http://${apihost}/updatebookinstatus?id=`+id+'&status='+bookingstatus;
  console.log("URL - updatebookingstatus: " + url);

return new Promise(function(resolve, reject) {
  request.put(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside updatebookingstatus Response from API (body)' + body);

      if (body == 'true')
        status = true;
      else status = false;
        resolve(body);
        //sendSMS();
      //var result = await sendEmail();
    }
    if (error) {
      console.log("Error in  update event status");
      status = false;
      return reject(error);
    }

  });
 
  console.log('returning');
   });
}

async function sendSMS() {
  console.log('calling API - sendSMS method');
  var mobiles = phone+','+providermobile;
  console.log("Mobiles: "+mobiles);
  var SMSmessage = 'We cancelled your booking with id '+id+', booking please login to view the details';
  var url = `http://${apihost}/sendSMS?authkey=`+ smsAPIKey+'&mobiles='+ mobiles +'&message='+SMSmessage+'&sender=DTSBMF&route=4&country=91';
  console.log("URL: " + url);
   return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside sendSMS - Response from API (body)' + body);

   if (error) {
      console.log("Error in Sending SMS");
      status = false;
      return reject(error);
    }

  if (body == 'true')
        status = true;
        resolve(body)
    }
    
      });
   });
}


function sendEmail() {
  console.log('calling API - sendEmail');
  var url = `http://${apihost}/sendmail`;
  console.log("URL: " + url);

  var subject = "Your booking for the event with id: "+id+" has been cancelled";
  var message = "<b>Your booking for the event Cancelled as per your requst. Thank you for the booking and We continue to provide our best service. ";
  var formdata = { 
  tomail: email+' ,'+providermail, 
  subject: subject, 
  message: message
};
  
  //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
  console.log("Data: "+formdata);
  return new Promise(function(resolve, reject) {
  request.post(url, { form: formdata }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside sendEmail - Response from API (body)' + body);

      if (body == 'true')
        resolve(body)
        status = true;
    }
    if (error) {
      console.log("Error in Sending Mail");
      status = false;
      return reject(error);
    }

  });
   });
}


/*function getSessionid() {
  var request = require('request');
  console.log('genSessionid - calling API');
  var url = `http://${apihost}/genSessionid`;
  console.log("getSeesionid - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('genSessionid - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("genSessionid -API Server not running: "+error);
      return reject(error);
    }
    console.log("getSessionid - Returning from API call")
  });

 });
 
}*/

function getBookingRecord() {
  var request = require('request');
  console.log('getBookingRecord - linkbooking - calling API');
  var url = `http://${apihost}/getbookingrec?bookingid=`+id;
  console.log("getSeesionid - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getBookingRecord - linkbooking - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("getBookingRecord - linkbooking -API Server not running: "+error);
      return reject(error);
    }
    console.log("getBookingRecord - Returning from API call")
  });

 });
 
}

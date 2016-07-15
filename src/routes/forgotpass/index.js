import React from 'react';
import Forgotpass from './Forgotpass';
import Login from '../Login';

export default {

  path: '/forgotpass',

  action({query}, {path}) {
    var email = query.email;
    console.log("Email ID:" + email);
    if (typeof email === 'undefined')
      return <Forgotpass />;
    else
    {
      sendEmail(email);
      <Login />;
    }

  }

};

function sendEmail(email)
{
var nodemailer = require('nodemailer');
 
var transporter = nodemailer.createTransport('smtps://dreamtruesolution%40gmail.com:sowmi6050@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: 'dreamtruesolution@gmail.com', // sender address 
    to: email, // list of receivers 
    subject: 'Hello ', // Subject line 
    text: 'Password Reset Mail ', // plaintext body 
    html: '<b>We received request and click here</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log("Error Message' "+error);
    }
    console.log('Message sent: ' + info.response);
});
}
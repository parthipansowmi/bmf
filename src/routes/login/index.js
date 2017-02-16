import React from 'react';
import Login from './Login';
import { apihost } from '../../config';
import {getSessionid} from '../../scripts/util';
var sessionid='';

export default {

  path: '/login',

 async action() {
    sessionid = await getSessionid();
    
    var message = ' ';
    console.log("SessionId-Login: "+sessionid);
    return <Login sessionid = {sessionid} message={message}/>;
  },

};


import React from 'react';
import Providerlogin from './providerlogin';
import {getSessionid} from '../../scripts/util';
var sessionid='';

export default {

  path: '/providerlogin',

 async action() {

    sessionid = await getSessionid();
    var message = ' ';
    console.log("SessionId-Login: "+sessionid);
    return <Providerlogin sessionid = {sessionid} message={message} />;
   
  },

};


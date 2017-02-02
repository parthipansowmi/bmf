import React from 'react';
import Changeprovideremail from './Changeprovideremail';
import Login from '../login/Login';
import { apihost } from '../../config';
var status = false ;
var code;


export default {

  path: '/changeprovideremail',

  async action({query}, {path}) {

    var email = query.email;
    var sessionid = query.sessionid;
    console.log("Email ID:" + email);
    //var body = await checkCode(code, email);
    
    code="verify";
    return <Changeprovideremail email={email} passCode={code} sessionid={sessionid}/>;
    
  },

};

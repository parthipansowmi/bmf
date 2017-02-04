import React from 'react';
import Changeproviderphone from './Changeproviderphone';
import Login from '../login/Login';
import { host, apihost} from '../../config';

var status = false ;

var email;

export default {

  path: '/changeproviderphone',

  async action({query}, {path}) {
    
    console.log("Query - Changeproviderphone: "+JSON.stringify(query));
    email = query.email;
    var providerRecord =  JSON.parse(await getProvider());
    console.log("Provider Record: "+providerRecord);
    var phone = providerRecord[0].phone;

    console.log("Provider Email: "+email);
    console.log("Provider Old Phone:"+phone);

    return <Changeproviderphone email={email} phone={phone}/>;

   
  },

};

function getProvider() {
  var request = require('request');
  console.log('genSessionid - calling API');
  var url = `http://${apihost}/getProvider?email=`+email;
  console.log("getProvider - URL: " + url);
  
  return new Promise(function(resolve, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('getProvider - Response from API' + body);
      //sessionid = body;
      resolve(body);
    }
    else {
      
      console.log("getProvider -API Server not running: "+error);
      return reject(error);
    }
    console.log("getProvider - Returning from API call")
  });

 });
 
}


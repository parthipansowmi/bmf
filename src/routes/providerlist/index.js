/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Providerlist from './Providerlist';
import { host, apihost } from '../../config';

var providerlist = [
  {
    "_id": "57f75cb5e0c058d42dc63df3",
    "modifieddate": "7/10/2016",
    "firstname": "Krishna",
    "lname": "Vembu",
    "address": "Vadamalai",
    "city": "Coimbatore",
    "zipcode": "600010",
    "email": "krishna_v@hotmail.com",
    "phone": "9841030770",
    "servicetype": "Pooja"
  },
  {
    "_id": "5805de4f50986a542046ced8",
    "modifieddate": "18/10/2016",
    "firstname": "Mukund",
    "lname": "Sundaram",
    "address": "No:10 2nd cross street",
    "city": "Chennai",
    "zipcode": "600041",
    "email": "parthipansowmi@gmail.com",
    "phone": "9840888415",
    "servicetype": "Pooja",
    "serveoutside": "on"
  }
];
export default {

  path: '/providerlist',

  action() {

   //getProviderData();
    return <Providerlist providerlist={providerlist} />;

  },

};

function getProviderData() {
  var request = require('request');
 
  console.log('calling API');
  var url = `http://${apihost}/searchByType?servicetype=Pooja`;
  console.log("URL: " + url);
  request(url,  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Inside getProviderData Response from API (body)' + body);
      providerlist = body;
      console.log("Providerlist: "+providerlist);

    }

  });
}

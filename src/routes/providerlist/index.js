/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Serviceprovider from './Providerlist';
import { host, apihost, smsAPIKey, SMSmessage } from '../../config';

var providerList;
export default {

  path: '/providerlist',

  action() {

    getProviderData();
    return <Providerlist providerlist= {providerlist} />;
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
      providerList = body;
      console.log("Providerlist: "+providerList);

    }

  });
}

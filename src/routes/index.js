/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import contact from './contact';
import login from './login';
import register from './register';
import savecustomer from './savecustomer'
import content from './content';
import error from './error';
import verifypass from './verifypass'
import forgotpass from './forgotpass'
import changepassword from './changepassword'
import updatepass from './updatepass'
import serviceprovider from './serviceprovider'
import saveprovider from './saveprovider'
import booking from './booking';
import savebooking from './savebooking'
import providerlogin from './providerlogin'

export default {

  path: '/',

  children: [
    home,
    contact,
    login,
    providerlogin,
    verifypass,
    forgotpass,
    changepassword,
    updatepass,
    register,
    savecustomer,
    serviceprovider,
    saveprovider,
    booking,
    savebooking,
    content,
    error
  ],

  async action({ next, render, context }) {
    const component = await next();
    
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};

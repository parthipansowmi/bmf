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
import content from './content';
import error from './error';
import verifypass from './verifypass'
import forgotpass from './forgotpass'

export default {

  path: '/',

  children: [
    home,
    contact,
    login,
    forgotpass,
    verifypass,
    register,
    content,
    error,
    forgotpass  
  ],

  async action({ next, render, context }) {
    const component = await next();
    /*console.log("inside the routes index.js");
    console.log("What Component");
    console.log(render);*/
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};

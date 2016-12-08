
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
import linkprovider from './linkprovider'
import verifyproviderlogin from './verifyproviderlogin'
import providerlist from './providerlist';
import logout from './logout';
export default {

  path: '/',
  

  children: [
    home,
    logout,
    contact,
    login,
    providerlogin,
    verifypass,
    verifyproviderlogin,
    forgotpass,
    changepassword,
    updatepass,
    register,
    savecustomer,
    serviceprovider,    
    saveprovider,
    booking,
    providerlist,
    savebooking,
    linkprovider,
    content,
    error,

  ],

  async action({ next, render, context }) {
    const component = await next();
    console.log("User: "+context.getUser('user'));
    
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};

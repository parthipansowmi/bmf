
import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import search from './searchprovider'
import contact from './contact';
import login from './login';
import register from './register';
import savecustomer from './savecustomer';
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
import bookinglist from './bookinglist';
import cancelbooking from './cancelbooking';
import changebookingdate from './changebookingdate';
import managebooking from './managebooking';
import providerhome from './providerhome';
import providerlogout from './providerlogout';

export default {

  path: '/',
  

  children: [
    home,
    search,
    logout,
    bookinglist,
    contact,
    login,
    providerlogin,
    providerhome,
    providerlogout,
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
    managebooking,
    cancelbooking,
    changebookingdate,
    providerlist,
    savebooking,
    linkprovider,
    content,
    error,

  ],

  async action({ next, render, context }) {
    const component = await next();
    //console.log("User: "+context.getUser('user'));
    
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};

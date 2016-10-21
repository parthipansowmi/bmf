

import React from 'react';
import Booking from './Booking';

export default {

  path: '/booking',

  action() {

    var date = new Date();
    var currentdate = date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear();
    //console.log("Date: " + currentdate);
    //return <Booking currentdate={currentdate} />;

    return <Booking />;
  },

};

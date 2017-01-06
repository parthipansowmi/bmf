/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Link from '../../components/Link';
import cx from 'classnames';

const title = 'Welcome to World of Opporunity';
const user = 'Customer';

function Home({ sessionid, email, bookinglist }, context) {
  context.setTitle(title);
  context.setUser(user);
 // context.getUser('user');
  var logoutlink = "/logout?sessionid="+sessionid;
  var bookinglink = "/booking?sessionid="+sessionid;
  var bookingdata = JSON.parse(bookinglist);
  return (
   /* <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>*/
    <div className={s.cards} >
     <div className={s.card}>
      <header>
        <h2>Search Provider</h2>
      </header>
      <br/>
      <br/>
      <input type="text" id="category" name="category" />
      <br/>
      <br/>
        <button  id="search" name="search">search</button>         
    </div>

    <div className={s.card}>
    <header>
        <h2>Service Booking</h2>
      </header>
      <Link className={s.link} to={bookinglink}>Home Function</Link>
      
      <Link className={s.link} to="/contact">Astrology</Link>
     <br/>
      <Link className={s.link } to="/">Marriage Services</Link>
      
      <Link className={s.link} to="/register">Catering</Link>
      <br/>
      <Link className={s.link} to={logoutlink} >Logout</Link>
            
      <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
      <input
              id="email"
              type="hidden"
              name="email"
              value={email}
              />
    </div>
    <div className={s.card}>
    <header>
        <h2>Booking History</h2>
      </header>
      <form name="form1" method="put" action="cancelbooking" >
    <table>
        <caption>Your Booking</caption>
          <thead>
          <tr>
          <th>Select</th><th>Booking ID</th><th>Booking Date</th><th>Event Date</th><th>Event</th><th>E-mail</th><th>Phone</th><th>Status</th>
          </tr>
          </thead>
          <tbody>
         
           { bookingdata.map((obj, index) => (
          <tr key={index}>
            <td><input type="radio" name="bookingid" value={obj.bookingid} /> </td>
            <td> {obj.bookingid}</td>
            <td> {obj.dateofbooking}</td>
            <td> {obj.functiondate} </td>
            <td> {obj.eventtype} </td>
            <td> {obj.email} </td>
            <td>{obj.mobile}</td>
            <td> {obj.status}</td>            
          </tr>
           ))}
           </tbody>
        </table>
        <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
        <button  value="" type="submit" >
         Cancel
        </button>

        <button  value="" type="submit" >
         Change Date
       </button>
       
       </form>
    </div>
          
    
    </div>
    
  );
}


Home.contextTypes = { setTitle: PropTypes.func.isRequired, setUser: PropTypes.func.isRequired };

export default withStyles(s)(Home);

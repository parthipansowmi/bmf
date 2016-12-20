

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Bookinglist.css';

const title = 'Service booking Search';


function Bookinglist({Bookingdata, customeremail, sessionid}, props, context) {
  //context.setTitle(title);
  
   var bookingdata = JSON.parse(Bookingdata);  

   console.log("booking Data: "+bookingdata);
    return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>My Booking</h1>
        
        <div>
        <form name="form1"  >
          <div className={s.formGroup}>
        <table>
        <caption>Service Providers</caption>
          <thead>
          <tr>
          <th>Email</th><th></th><th>Booking Date</th><th>Function Date</th><th>Mobile</th><th>Status</th><th>Event Type</th></tr></thead>
          <tbody>
         
           { bookingdata.map((obj, index) => (
          <tr key={index}>
          <td><input type="radio" name="customeremail" value={obj.email} /> </td>
            <td> <input id="email" type="hidden" value={obj.email}/>{obj.email} </td>
            <td> {obj.bookingdate}</td>
            <td> {obj.functiondate}</td>
            <td> {obj.mobile} </td>            
            <td> {obj.status}</td>
            <td> {obj.eventtype}</td>           
          </tr>
           ))}
           </tbody>
        </table>
        </div>
            
         <div >
         <br></br>
         <input type="hidden" name="customeremail"  value={customeremail} />
         <input type="hidden" name="sessionid"  value={sessionid} />
        
        </div>
         </form>
        </div>
      </div>                     
    </div>
  );


}

Bookinglist.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Bookinglist);

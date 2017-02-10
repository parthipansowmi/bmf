
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cateringbooking.css';

const title = 'New Event Booking';

var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var currentdate = day + '/' + month + '/' + year;


function Cateringbooking({sessionid, bookingid, email, phone}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <form name="form1" method="put" action="savebooking" >
          <div className= {s.leftContainer}>
          <input id="status" type="hidden"  value="booked" name="status" />
            <label className={s.label} htmlFor="dateofbooking">
              Date of Booking:
            </label>
            <input
              className={s.input}
              id="dateofbooking"
              type="text"
              name="dateofbooking"
              value={currentdate}
              autoFocus
              readOnly
              />
          
            <label className={s.label} htmlFor="eventdate">
              <span>Event Date: </span>
            </label>
            <input
              className={s.input}
              id="functiondate"
              type="date"
              name="functiondate"
              required
              />
          </div>

          <div >
            <label className={s.label} htmlFor="email">
              <span>E-mail: </span>
            </label>
            <input
              className={s.input}
              id="email"
              type="email"
              name="email"
              value={email}
             readOnly
              />
            <label className={s.label} htmlFor="mobile">
              <span>Mobile Number: </span>
            </label>
            <input
              className={s.input}
              id="mobile"
              type="number"
              name="mobile"
              value={phone}
              readOnly
                />
          </div>
          <br/>
          
          <div>
            <label className={s.label} htmlFor="Function" >
              <span>Service: </span>
            </label>
            <input
              className={s.input}
              id="eventtype"
              type="text"
              name="eventtype"
              value="Catering"
              readOnly
              />
            <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />
            <input
              id="bookingid"
              type="hidden"
              name="bookingid"
              value={bookingid}
              />
              <input
              id="bookingtype"
              type="hidden"
              name="bookingtype"
              value="Catering"
              />
          </div>
          <div className={s.formGroup}>
            <button className={s.button}  value="submit" type="submit" >
              Book Event
            </button>
          </div>
        </form>


      </div>
    </div>
  );
}

Cateringbooking.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Cateringbooking);


import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Managebooking.css';


const title = 'Manage Booking';

function Managebooking({sessionid, bookingid, eventdate}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <form name="form1" method="put" action="changebookingdate" >
        <div className={s.formGroup}>
        
            <label className={s.label} htmlFor="currentdate">
             Current Event Date:
            </label>
            <input
              className={s.input}
              id="currentdate"
              type="text"
              name="currentdate" 
              value={eventdate} 
              readOnly            
              />
               <label className={s.label} htmlFor="newdate">
             Select New Date:
            </label>
            <input
              className={s.input}
              id="newdate"
              type="date"
              name="newdate"              
              />
          </div>
          <div className={s.formGroup}>
            <button className={s.button}    value="Change Date" type="submit" >
              Change Event Date
            </button>
          </div>
        
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
          </form>
      </div>
    </div>
  );
}

Managebooking.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Managebooking);

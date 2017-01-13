
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Managebooking.css';

const title = 'Manage Booking';

function Managebooking({message, redirectlink, message1, sessionid}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{message}</p>
        <a href={redirectlink}>{message1} </a>
         <input
              id="sessionid"
              type="hidden"
              name="sessionid"
              value={sessionid}
              />             
      </div>
    </div>
  );
}

Managebooking.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Managebooking);

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifyPass.css';
import me from '../../data/queries/me.js';

const title = 'Verify Credential';
const user = 'Customer'

function VerifyPass({message, sessionid}, props, context) {
  context.setUser(user);
  context.setTitle(title);
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{message}</p>
           <a href={redirectlink}>Click Here to Login </a>    
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

VerifyPass.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(VerifyPass);

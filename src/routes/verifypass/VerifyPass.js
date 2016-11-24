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
import s from './VerifyPass.css';
import me from '../../data/queries/me.js';

const title = 'Verify Credential';

function VerifyPass({message, sessionid}, props, context) {
 
  context.setTitle(title);
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{message}</p>
           <a href={redirectlink}>Clicke Here to Login </a>    
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

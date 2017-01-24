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
import s from './Cancelbooking.css';

const title = 'Cancel Booking';

function Cancelbooking({message, redirectlink, message1, sessionid}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{message}</p>
        <script>
        </script>
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

Cancelbooking.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Cancelbooking);

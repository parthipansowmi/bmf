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
import s from './Providerlist.css';
import JsonTable from 'react-json-table';

const title = 'Service Provider Search';


function Providerlist({providerlist}, props, context) {
  console.log("Props: " + props)
  console.log("Context: " + context)
  console.log("providerlist: " + providerlist);
  context.setTitle(title);
  
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}></h1>
        <ul className={s.news}>
          {providerlis.map((item, index) => (
            <li key={index} >
              <a href="http://localhost:3000" >{item.email}</a>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );


}

Providerlist.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Providerlist);

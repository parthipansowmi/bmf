/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';
import fb from '../../public/fb.png';
import twitter from '../../public/twitter.png';
import linkedin from '../../public/linkedin.png';
import Navigation from '../Navigation';

function Footer() {
  return (
    <div className={s.root}>
      <div className={s.container}>
    
          <Link className={s.brand} to="/facebook">
            <img src={fb} width="20" height="20" alt="React" />
            <span className={s.spacer}>   </span>
          </Link>
          <Link className={s.brand} to="/twitter">
            <img src={twitter} width="20" height="20" alt="React" />
            <span className={s.spacer}> </span>
          </Link>
          <Link className={s.brand} to="/linkedin">
              <img src={linkedin} width="20" height="20" alt="React" />
              <span className={s.spacer}> </span>
          </Link>
      
          <span className={s.text}>© Dream True Soutions</span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/">Home</Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} to="/privacy">Privacy</Link>
          <span className={s.spacer}>·</span>
      </div>
      </div>
      );
      }

      export default withStyles(s) (Footer);

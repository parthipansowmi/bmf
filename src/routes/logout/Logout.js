import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logout.css';

const title = 'Logout';

function Logout({message, redirectlink, message1}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{message}</p>
        <a href={redirectlink}>{message1}</a>                      
      </div>
    </div>
  );
}

Logout.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Logout);

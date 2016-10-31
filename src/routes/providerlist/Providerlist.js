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

const title = 'Service Provider Search';


function Providerlist({providerlist}, props, context) {
  //context.setTitle(title);
   
   var providerdata = [
  {
    "_id": "57f75cb5e0c058d42dc63df3",
    "modifieddate": "7/10/2016",
    "firstname": "Krishna",
    "lname": "Vembu",
    "address": "Vadamalai",
    "city": "Coimbatore",
    "zipcode": "600010",
    "email": "krishna_v@hotmail.com",
    "phone": "9841030770",
    "servicetype": "Pooja"
  },
  {
    "_id": "5805de4f50986a542046ced8",
    "modifieddate": "18/10/2016",
    "firstname": "Mukund",
    "lname": "Sundaram",
    "address": "No:10 2nd cross street",
    "city": "Chennai",
    "zipcode": "600041",
    "email": "parthipansowmi@gmail.com",
    "phone": "9840888415",
    "servicetype": "Pooja",
    "serveoutside": "on"
  }
];
   console.log(providerdata);
    return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>Service Provider Search</h1>
        <p>Select Provider near by you</p>
        <div>
        <form name="form1" method="get"  action="verifyproviderlogin" >
          <div className={s.formGroup}>
        <table>
        <caption>Service Providers</caption>
          <thead>
          <tr>
          <th>Select</th><th>Email</th><th>First Name</th><th>Last Name</th><th>Address</th><th>City</th><th>Phone</th></tr></thead>
          <tbody>
         
           { providerdata.map((obj, index) => (
          <tr key={index}>
          <td><input type="radio" name="provider" /> </td>
            <td> {obj.email}</td>
            <td> {obj.firstname}</td>
            <td> {obj.lname} </td>
            <td> {obj.address}</td>
            <td> {obj.city}</td>
            <td>{obj.phone}</td>
          </tr>
           ))}
           </tbody>
        </table>
        </div>
        </form>
        </div>
        
         <div >
         <br></br>
         <button   className={s.button}  type="submit" >
             Submit
         </button>
        </div>
                
      </div>                     
    </div>
  );


}

Providerlist.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Providerlist);

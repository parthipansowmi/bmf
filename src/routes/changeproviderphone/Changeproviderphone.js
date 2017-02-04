

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './changeproviderphone.css';
const title = 'Changing Provider Phone';



function Changeproviderphone({email, phone}, context) {
  console.log("Changeproviderphone: "+email);
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        
        <form name="form1" method="put" action="confirmOTP" >
        
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="phone">
              Current phone:
            </label>
            <input
              className={s.input}
              id="oldphone"
              type="text"
              name="oldphone"
              value={phone}
              readOnly
              />
                    
            <label className={s.label} htmlFor="newphone">
              New phone:
            </label>
            <input
              className={s.input}
              id="newphone"
              type="text"
              name="newphone"              
              />
          
           <input   
              id="email"
              type="hidden"
              name="email"
              value = {email}
              />
         </div> 
          <div className={s.formGroup}>
            <button className={s.button}    value="Change phone" type="submit" >
              Change phone
            </button>
            
          </div>
          <script>
          </script>
        </form>

      </div>
    </div>

  );
}

Changeproviderphone.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Changeproviderphone);

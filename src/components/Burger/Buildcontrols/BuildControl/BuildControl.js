import React from 'react';
import classes from './BuildControl.css'
const buildcontrol=(props)=>(
    
    <div className={classes.BuildControl}>
       <div className={classes.label}> {props.label} </div>
       <button className={classes.Less}>Remove</button>
       <button className={classes.More}>Add</button>
    </div>
);

export default buildcontrol;
import React from 'react';
import classes from './BuildControl.css'
const buildcontrol=(props)=>(
    
    <div className={classes.BuildControl}>
       <div 
       className={classes.Label}> {props.label} </div>
       <button 
       className={classes.Less} 
       onClick={props.remove} 
       disabled={props.disable}>Remove</button>
       <button 
       className={classes.More} 
       onClick={props.added}>Add</button>
    </div>
);

export default buildcontrol;
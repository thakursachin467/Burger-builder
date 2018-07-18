import React from 'react';
import classes from './BuildControls.css';
import BuildControl  from './BuildControl/BuildControl'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
];

const buildcontrols=(props)=>(
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>&#8377;{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label} label={ctrl.label} 
            added={()=>props.ingedrientAdded(ctrl.type)}   
            remove={()=>props.ingedrientRemove(ctrl.type)}
            disable={props.disabled[ctrl.type]}
            />
        ))}
        <button className={classes.OrderButton} disabled={!props.oldPurchase} onClick={props.purchasing}>ORDER NOW</button>
    </div>
);

export  default buildcontrols;
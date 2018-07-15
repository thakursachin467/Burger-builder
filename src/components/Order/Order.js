import React from 'react'
import classes from './Order.css';
import Burger from '../Burger/Burger';



const order =(props)=>{
    const ingedrients=[];
    for(let ingedrient in props.Ingedrients){
        ingedrients.push(
            {
                name:ingedrient,
                amount:props.Ingedrients[ingedrient]
            });
    }

    const ingedrientOutput=ingedrients.map(igKey=>{
        return <span 
        style={
            {textTransform:'Capitalize',
               display:'inline-block',
                margin:'0 8px ',
            border:'1px solid black' }}
        key={igKey.name}> {igKey.name}:{igKey.amount} </span>
    })
    return(
        <div className={classes.Order}>
            <div>
            <p>Ingedrients:{ingedrientOutput}</p>
            <p> Price: <strong>&#x20B9;{Number.parseFloat(props.Price).toFixed(2)} </strong></p>
            <Burger ingedrient={props.Ingedrients} height="100px" width="100px"/>
            </div>
            
        </div>
    );
}

export default order;
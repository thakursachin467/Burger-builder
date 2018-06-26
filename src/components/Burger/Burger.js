import React from 'react';
import classes from './Burger.css';
import BurgerIngedrient from './Burger/Burgeringedrient/Burgeringedrient';
const burger=(props)=>{
    let newingedrient=Object.keys(props.ingedrient)
        .map(igKey=>{
        return [...Array(props.ingedrient[igKey])]
        .map((_,i)=>{
           return <BurgerIngedrient key={igKey+i} type={igKey}/>
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(newingedrient.length===0){
        newingedrient=<p>please start adding ingedrients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngedrient type="bread-top"/>
            {newingedrient}
            <BurgerIngedrient type="bread-bottom"/>
        </div>
    );
}

export default burger;
import React from 'react';
import NavigationItem from './Navigationitem/Navigationitem';
import classes from './Navigationitems.css'
const navigationitems=(props)=>(
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/" exact>Burger Builder </NavigationItem>
       <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationitems;



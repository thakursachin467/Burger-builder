import React from 'react';
import NavigationItem from './Navigationitem/Navigationitem';
import classes from './Navigationitems.css'
const navigationitems=(props)=>(
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/" active>Burger Builder </NavigationItem>
       <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
);

export default navigationitems;



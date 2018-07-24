import React from 'react';
import NavigationItem from './Navigationitem/Navigationitem';
import classes from './Navigationitems.css'
const navigationitems=(props)=>(
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/" exact>Burger Builder </NavigationItem>
       {props.token ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
       {props.token ?<NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/Auth">Authenticate</NavigationItem> }
    </ul>
);


export default navigationitems;



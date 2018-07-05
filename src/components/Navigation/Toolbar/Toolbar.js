import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import Navigationitems from '../Navigationitems/Navigationitems';
import SideBar from '../Sidedrawer/Sidedrawer'

const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <div onClick={props.open} className={classes.MobileOnly}>
            <div className={classes.Div}></div>
            <div className={classes.Div}></div>
            <div className={classes.Div}></div>
        </div>
        <div></div>
        
        <SideBar />
        
        <Logo height="80%"/>
        
        <nav className={classes.DesktopOnly}>
           <Navigationitems/>
        </nav>
    </header>
);

export default toolbar;
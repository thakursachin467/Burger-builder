import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
const sideDrawer =(props)=>{
        let attachedclasses=[classes.SideDrawer,classes.Close];
        if(props.open) {
            attachedclasses=[classes.SideDrawer,classes.Open]
        }
    return (
        <Aux>
        <BackDrop show={props.open}  clicked={props.closed}/>
        <div className={attachedclasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
            <Logo />
        </div>
            <nav>
            <NavigationItems token={props.token}/>
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;
import React from 'react';
import classes from './Spinner.css';
import Aux from '../../../hoc/Aux';
const spinner=(props)=>{
    let loader;
    switch(props.value){
        case 1:
            loader=<div className={classes.Loader}>
            loading.......
            </div>;
            break;
        case 2:
        loader=  <div className={classes.Loader2}>Loading...</div>;
            break;
        case 3:
            loader=<div className={classes.Loader3}>
            loading.......
            </div>;
            break;
        default:
            loader=<div className={classes.Loader}>
            loading.......
            </div>;


    }
   return (
    <Aux>
    {loader}
    </Aux>
);
}

export default spinner;
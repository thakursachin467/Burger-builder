import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredient)
    .map(igKey=>{
        return (<li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredient[igKey]}</li>);
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: &#8377;{props.totalsum.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.clickedCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.clickedContinue}>Continue</Button>
        </Aux>
    ); 
};

export default orderSummary;
import React,{Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    render (){
        
        const ingredientSummary=Object.keys(this.props.ingredient)
    .map(igKey=>{
        return (<li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredient[igKey]}</li>);
    });

        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delecious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: &#8377;{this.props.totalsum.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.clickedCancel}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.clickedContinue}>Continue</Button>
        </Aux>
        );
    }
}


export default OrderSummary;
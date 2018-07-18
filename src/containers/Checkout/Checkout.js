import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect } from 'react-redux';
class Checkout extends Component {
   
    
    checkoutCancelHandller = () => {
        this.props.history.push('/');
    }
    checkoutContinueHandller = () => {
        this.props.history.replace('/checkout/contact-data');
    }
     

    render(){
        let orderSummary=<Spinner/>;
        if(this.props.ings){
            orderSummary=<CheckoutSummary ingedrient={this.props.ings}
            checkoutCancel={this.checkoutCancelHandller}
            checkoutContinue={this.checkoutContinueHandller}/>;
        }
        return(
            <div>
                {orderSummary}
                <Route path={this.props.match.path + '/contact-data'}  render={(props)=>(<ContactData ingedrient={this.props.ingst} price={this.props.price} {...props}/>)}/>
            </div>
        );
    }
}


const mapStateToProps=state=>{
    return {
        ings:state.ingedrient,
        price:state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);

import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
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
        let purchased;
        if(this.props.ings){
            purchased=this.props.purchased ? <Redirect to="/" />:null ;
            orderSummary=<CheckoutSummary ingedrient={this.props.ings}
            checkoutCancel={this.checkoutCancelHandller}
            checkoutContinue={this.checkoutContinueHandller}/>;
            
        } else {
            orderSummary=<Redirect to="/" />
        }
        return(
            <div>
                {purchased}
                {orderSummary}
                <Route path={this.props.match.path + '/contact-data'}  component={ContactData }/>
            </div>
        );
    }
}


const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingedrient,
        purchased:state.order.purchasing
    }
}



export default connect(mapStateToProps)(Checkout);

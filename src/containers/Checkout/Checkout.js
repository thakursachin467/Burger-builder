import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
    state ={
        ingedrient:null,
        totalPrice:null
    }
    
    checkoutCancelHandller = () => {
        this.props.history.push('/');
    }
    checkoutContinueHandller = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    componentWillMount(){
        //console.log(this.props.location.search);
        const query= new URLSearchParams(this.props.location.search);
        const ingedrient={}
        let price=0;
        for(let params of query.entries()){
                if(params[0]==="price"){
                    price=params[1];
                } else{
                ingedrient[params[0]]=+params[1];
                }
        }
        this.setState({ingedrient:ingedrient,totalPrice:price})

    }

    render(){
        let orderSummary=<Spinner/>;
        if(this.state.ingedrient){
            orderSummary=<CheckoutSummary ingedrient={this.state.ingedrient}
            checkoutCancel={this.checkoutCancelHandller}
            checkoutContinue={this.checkoutContinueHandller}/>;
        }
        return(
            <div>
                {orderSummary}
                <Route path={this.props.match.path + '/contact-data'}  render={(props)=>(<ContactData ingedrient={this.state.ingedrient} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;

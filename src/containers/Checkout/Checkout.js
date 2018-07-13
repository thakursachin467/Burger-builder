import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state ={
        ingedrient:{
            salad:1,
            cheese:1,
            bacon:1,
            meat:1
        }
    }
    
    checkoutCancelHandller = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandller = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    componentDidMount(){
        //console.log(this.props.location.search);
        const query= new URLSearchParams(this.props.location.search);
        const ingedrient={}
        for(let params of query.entries()){
                ingedrient[params[0]]=+params[1]
        }
        this.setState({ingedrient:ingedrient})

    }

    render(){
        return(
            <div>
                <CheckoutSummary ingedrient={this.state.ingedrient}
                checkoutCancel={this.checkoutCancelHandller}
                checkoutContinue={this.checkoutContinueHandller}/>
            </div>
        );
    }
}

export default Checkout;

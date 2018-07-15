import React, { Component } from 'react';
import Order from '../Order/Order';
import axios from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

class Orders extends Component {
    state={
        orders:null,
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then((response)=>{
            console.log(response.data);
            const fetchedData=[];
            for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id:key
                }
            );
            }
            this.setState({loading:false,orders:fetchedData});
        })
        .catch((error)=>{
            console.log(error);
            this.setState({loading:false});
        })
    }
    render(){
        let Orders=<Spinner/>
        if(!this.state.loading){

            Orders= 
                this.state.orders.map(order=>{
               return <Order 
               Ingedrients={order.ingedrient}
               Price={order.price}
               key={order.id}/>
            })
           
        }
        return (
            <Aux>
            {Orders}
            </Aux>
        );
    }
}


export default withErrorHandler(Orders,axios);
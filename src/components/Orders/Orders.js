import React, { Component } from 'react';
import Order from '../Order/Order';
import axios from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
class Orders extends Component {
    state={
        orders:null,
        loading:true
    }
    componentDidMount(){
        console.log(this.props.userid);
        const queryParams='?auth='+ this.props.token + '&orderBy="user"&equalTo="'+ this.props.userid + '"';
        console.log(queryParams)
        axios.get('/orders.json'+queryParams) 
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
        let Orders=<Spinner value={Math.floor((Math.random() * 4) + 1)}/>
       
            
        if(!this.state.loading){
            if(this.props.token==null){
                Orders=<p style={{"textAlign":"center","fontWeight":"bold"}}>Please Login to see your orders</p>;
                
    
            } else if(this.state.orders===null ||this.state.orders.length===0){
                Orders=<p style={{"textAlign":"center","fontWeight":"bold"}}>You havn't placed any order yet</p>;
            } else{
            Orders= 
                this.state.orders.map(order=>{
               return <Order 
               Ingedrients={order.ingedrient}
               Price={order.price}
               key={order.id}/>;

              
            })
           
        }
    }
    
        return (
            <Aux>
            {Orders}
            </Aux>
        );
    }
}

const mapPropsToState=(state)=>{
    return{
    token:state.auth.token,
    userid:state.auth.userId
    }
}

export default connect(mapPropsToState)(withErrorHandler(Orders,axios));
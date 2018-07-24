import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger  from '../../components/Burger/Burger';
import BuidControl from '../../components/Burger/Buildcontrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import {connect } from 'react-redux';
import * as builder from '../../Store/actions/index'


class BurgerBuilder extends Component {
        state ={
                purchasing:false
        }

        componentDidMount(){
            this.props.fetchIngedrients()
        }

        updatePurchaseState(ingr){
                const sum=Object.keys(ingr)
                .map(igKey=>{
                    return ingr[igKey]
                })
                .reduce((sum,el)=>{
                    return sum+el;
                },0);

                return sum>0;
                
        }

        purchaseHandler =()=> {
            if(this.props.isAuthenticated){
                this.setState({purchasing:true});
            } else {
                this.props.history.push('/Auth');
            }
            
        }

        purchaseCancelHandler=()=>{
            this.setState({purchasing:false})
        }

        purchaseContinueHandler=()=>{
           
            this.props.onNewPurchase()
            this.props.history.push({
                pathname:'/checkout'
            });
        }

      
       
        render() {
            
            
            const disableInfo={
                    ...this.props.ings
            };
            for(let key in disableInfo ){
                disableInfo[key]= disableInfo[key]<=0
            }
            let orderSummary;

            let burger= this.props.error? <p>Failed loading the ingedrient</p>:<Spinner value={Math.floor((Math.random() * 4) + 1)}/>;
            if(this.props.ings) {
                orderSummary= <OrderSummary ingredient={this.props.ings} 
            clickedCancel={this.purchaseCancelHandler}
            clickedContinue={this.purchaseContinueHandler}
            totalsum={this.props.price}/>;
                burger=(
                    <Aux>
                    <Burger ingedrient={this.props.ings}/>
                    <BuidControl 
                        ingedrientAdded={this.props.onIngedrientAdded}
                        ingedrientRemove={this.props.onIngedrientRemove}
                        disabled={disableInfo}
                        price={this.props.price}
                        oldPurchase={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                    </Aux>
            );
            }

            if(this.props.loading){
                orderSummary= <Spinner value={Math.floor((Math.random() * 4) + 1)}/>
            }

            return(
                <Aux> 
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} > 
                        {orderSummary}
                    </Modal>
                    {burger}

                    

                </Aux>
            );
        }

}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingedrient,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        loading:state.burgerBuilder.loading,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToProps=(dispatch) =>{
    return{
         onIngedrientAdded:(ingname)=>dispatch(builder.addIngedrients(ingname)),
         onIngedrientRemove:(ingname)=>dispatch(builder.removeIngedrients(ingname)),
         fetchIngedrients:()=>dispatch(builder.fetchIngedrients()),
         onNewPurchase:()=>dispatch(builder.purchaseNew())
    }
}

 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
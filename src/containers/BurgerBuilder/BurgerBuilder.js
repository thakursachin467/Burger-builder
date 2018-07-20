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
            this.setState({purchasing:true});
        }

        purchaseCancelHandler=()=>{
            this.setState({purchasing:false})
        }

        purchaseContinueHandler=()=>{
           
            
            this.props.history.push({
                pathname:'/checkout'
            });
        }

        // addIngederientHandler=(type)=>{
        //         const oldCount=this.state.ingedrient[type];
        //         const updateCount=oldCount+1;
        //         const updateingedrient={
        //             ...this.state.ingedrient
        //         };
        //         const oldPurchase=this.state.purchasable;
        //         const updatedPurchase=oldPurchase+1;
        //         updateingedrient[type]=updateCount;
        //         const additionPrice=INGEDRIENT_PRICES[type];
        //         const oldPrice= this.state.totalPrice;
        //         const newPrice=oldPrice+additionPrice;
        //         this.setState({totalPrice:newPrice,
        //         ingedrient:updateingedrient,
        //         purchasable:updatedPurchase})
        // }

        // removeIndederientHandler=(type)=>{
        //     let updateCount=0;
        //     const oldCount=this.state.ingedrient[type];
        //     if(oldCount===0){
        //       updateCount= oldCount;
        //     } else{
        //       updateCount= oldCount-1;
        //     }
            
        //     const updateingedrient={
        //         ...this.state.ingedrient
        //     };
        //     const oldPurchase=this.state.purchasable;
        //     let updatedPurchase=0
        //     if(oldPurchase===0){
        //       updatedPurchase=oldPurchase;
        //     } else{
        //       updatedPurchase=oldPurchase-1;
        //     }
        //     updateingedrient[type]=updateCount;
        //     const removePrice=INGEDRIENT_PRICES[type];
        //     const oldPrice=this.state.totalPrice;
        //     const newPrice=oldPrice-removePrice;
        //     this.setState({totalPrice:newPrice,
        //         ingedrient:updateingedrient,
        //         purchasable:updatedPurchase
        //     })

        // }
       


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
        ings:state.ingedrient,
        price:state.totalPrice,
        error:state.error,
        loading:state.loading
    }
}

const mapDispatchToProps=(dispatch) =>{
    return{
         onIngedrientAdded:(ingname)=>dispatch(builder.addIngedrients(ingname)),
         onIngedrientRemove:(ingname)=>dispatch(builder.removeIngedrients(ingname)),
         fetchIngedrients:()=>dispatch(builder.fetchIngedrients())
    }
}

 export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
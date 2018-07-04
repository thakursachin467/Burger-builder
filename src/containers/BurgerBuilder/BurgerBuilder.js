import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger  from '../../components/Burger/Burger';
import BuidControl from '../../components/Burger/Buildcontrols/BuildControls';

const INGEDRIENT_PRICES={
    salad:30,
    bacon:20,
    meat:30,
    cheese:15
};
class BurgerBuilder extends Component {
        state ={
            ingedrient:{
                salad:0,
                bacon:0,
                meat:0,
                cheese:0
                },
                totalPrice:40,
                purchasable:0
        }

        addIngederientHandler=(type)=>{
                const oldCount=this.state.ingedrient[type];
                const updateCount=oldCount+1;
                const updateingedrient={
                    ...this.state.ingedrient
                };
                const oldPurchase=this.state.purchasable;
                const updatedPurchase=oldPurchase+1;
                updateingedrient[type]=updateCount;
                const additionPrice=INGEDRIENT_PRICES[type];
                const oldPrice= this.state.totalPrice;
                const newPrice=oldPrice+additionPrice;
                this.setState({totalPrice:newPrice,
                ingedrient:updateingedrient,
                purchasable:updatedPurchase})
        }

        removeIndederientHandler=(type)=>{
            let updateCount=0;
            const oldCount=this.state.ingedrient[type];
            if(oldCount===0){
              updateCount= oldCount;
            } else{
              updateCount= oldCount-1;
            }
            
            const updateingedrient={
                ...this.state.ingedrient
            };
            const oldPurchase=this.state.purchasable;
            let updatedPurchase=0
            if(oldPurchase===0){
              updatedPurchase=oldPurchase;
            } else{
              updatedPurchase=oldPurchase-1;
            }
            updateingedrient[type]=updateCount;
            const removePrice=INGEDRIENT_PRICES[type];
            const oldPrice=this.state.totalPrice;
            const newPrice=oldPrice-removePrice;
            this.setState({totalPrice:newPrice,
                ingedrient:updateingedrient,
                purchasable:updatedPurchase
            })

        }
        render() {
            const disableInfo={
                    ...this.state.ingedrient
            };
            for(let key in disableInfo ){
                disableInfo[key]= disableInfo[key]<=0
            }
            return(
                <Aux> 
                    <Burger ingedrient={this.state.ingedrient}/>
                    <BuidControl 
                        ingedrientAdded={this.addIngederientHandler}
                        ingedrientRemove={this.removeIndederientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        oldPurchase={this.state.purchasable}
                    />
                    

                </Aux>
            );
        }

}


 export default BurgerBuilder;
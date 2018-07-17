import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger  from '../../components/Burger/Burger';
import BuidControl from '../../components/Burger/Buildcontrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'


const INGEDRIENT_PRICES={
    salad:30,
    bacon:20,
    meat:30,
    cheese:15
};
class BurgerBuilder extends Component {
        state ={
            ingedrient:null,
                totalPrice:40,
                purchasable:0,
                purchasing:false,
                loading:false,
                error:null
        }

        componentDidMount(){
            axios.get('https://react-burger-builder-2a539.firebaseio.com/ingedrient.json')
            .then((response)=>{
                this.setState({ingedrient:response.data})
            })
            .catch((error)=>{
                console.log(error);
                this.setState({error:true})
            })
        }

        purchaseHandler =()=> {
            this.setState({purchasing:true});
        }

        purchaseCancelHandler=()=>{
            this.setState({purchasing:false})
        }

        purchaseContinueHandler=()=>{
           
            const queryParams=[]
            for(let i in this.state.ingedrient){
                queryParams.push(encodeURIComponent(i)+ "="+encodeURIComponent(this.state.ingedrient[i]));
            }
            queryParams.push("price="+this.state.totalPrice);
            const queryString=queryParams.join('&');
            this.props.history.push({
                pathname:'/checkout',
                search:'?'+queryString
            });
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
            let orderSummary;

            let burger= this.state.error? <p>Failed loading the ingedrient</p>:<Spinner value={Math.floor((Math.random() * 4) + 1)}/>;
            if(this.state.ingedrient) {
                orderSummary= <OrderSummary ingredient={this.state.ingedrient} 
            clickedCancel={this.purchaseCancelHandler}
            clickedContinue={this.purchaseContinueHandler}
            totalsum={this.state.totalPrice}/>;
                burger=(
                    <Aux>
                    <Burger ingedrient={this.state.ingedrient}/>
                    <BuidControl 
                        ingedrientAdded={this.addIngederientHandler}
                        ingedrientRemove={this.removeIndederientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        oldPurchase={this.state.purchasable}
                        purchasing={this.purchaseHandler}
                    />
                    </Aux>
            );
            }

            if(this.state.loading){
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


 export default withErrorHandler(BurgerBuilder,axios);
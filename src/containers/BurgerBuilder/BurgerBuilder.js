import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger  from '../../components/Burger/Burger';
import BuidControl from '../../components/Burger/Buildcontrols/BuildControls';
class BurgerBuilder extends Component {
        state ={
            ingedrient:{
                salad:0,
                bacon:2,
                meat:1,
                cheese:1
                }
        }
        render() {
            return(
                <Aux> 
                    <Burger ingedrient={this.state.ingedrient}/>
                    <BuidControl/>
                    

                </Aux>
            );
        }

}


 export default BurgerBuilder;
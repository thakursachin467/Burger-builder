import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger  from '../../components/Burger/Burger';
class BurgerBuilder extends Component {
        state ={
            ingedrient:{
                salad:0,
                bacon:2,
                meat:0,
                cheese:2
                }
        }
        render() {
            return(
                <Aux> 
                    <Burger ingedrient={this.state.ingedrient}/>
                    <div> Build Controls </div>

                </Aux>
            );
        }

}


 export default BurgerBuilder;
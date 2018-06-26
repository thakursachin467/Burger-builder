import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Classes from './Burgeringedrient.css';

class BurgerIngedrient extends Component{
    render(){
    let ingedrient= null;
    switch(this.props.type) {
        case("bread-bottom"):
            ingedrient=<div className={Classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingedrient=(
            <div className={Classes.BreadTop}>
                <div className={Classes.Seeds1}></div>
                <div className={Classes.Seeds2}></div>
            </div>
            );
            break;
        case('meat'):
            ingedrient=<div className={Classes.Meat}></div>
            break;
        case('cheese'):
            ingedrient=<div className={Classes.Cheese}></div>
            break;
        case('salad'):
            ingedrient=<div className={Classes.Salad}></div>
            break;
        case('bacon'):
            ingedrient=<div className={Classes.Bacon}></div>
            break;
        default:
            ingedrient= null
    }
    return ingedrient;
    }
}
BurgerIngedrient.PropTypes= {
    type :PropTypes.string.isRequired
};

export default BurgerIngedrient;
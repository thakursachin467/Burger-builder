import React,{Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import {connect }from 'react-redux';
import * as OrderAction from '../../../Store/actions/index';
class ContactData extends Component{


        state={
            orderForm:{
                        name:{
                            elementType:'input',
                            elementConfig:{
                                type:'text',
                                placeholder:'Your Name'
                            },
                            value:'',
                            validation:{
                                required:true
                            },
                            valid:false,
                            touched:false
                        } ,
                        street: {
                            elementType:'input',
                            elementConfig:{
                                type:'text',
                                placeholder:'Street'
                            },
                            value:'',
                            validation:{
                                required:true
                            },
                            valid:false,
                            touched:false
                        },
                        zipcode: {
                            elementType:'input',
                            elementConfig:{
                                type:'text',
                                placeholder:'Zip Code'
                            },
                            value:'',
                            validation:{
                                required:true,
                                minLength:5,
                                maxLength:5
                            },
                            valid:false,
                            touched:false
                        },
                        country:{
                            elementType:'input',
                            elementConfig:{
                                type:"text",
                                placeholder:'Country'
                            },
                            value:'',
                            validation:{
                                required:true
                            },
                            valid:false,
                            touched:false
                        },
                        email: {
                            elementType:'input',
                            elementConfig:{
                                type:'email',
                                placeholder:'Your email'
                            },
                            value:'',
                            validation:{
                                required:true
                            },
                            valid:false,
                            touched:false
                        },
                        deliveryMethod:{
                            elementType:'select',
                            elementConfig:{
                                options:[{
                                    value:'fastest',
                                    displayVALUE:'fastest'
                                },
                                {
                                    value:'chep',
                                    displayVALUE:'chepest'
                                }]
                            },
                            value:'fastest',
                            valid:true
                        }
            },
            
            formIsValid:false
        }
        orderSubmittHandler=(event)=> {
                event.preventDefault();
                const formData={};
                for(let formElement in this.state.orderForm){
                    formData[formElement]=this.state.orderForm[formElement].value;
                }
                console.log(this.props.ings);  
                const order = {
                    ingedrient: this.props.ings,
                    price: this.props.price,
                    orderData:formData
                   
                }

                console.log(order);
                this.props.onOrderBurger(order);
        }

        checkValidation=(value,rules)=>{
                let isValid=true;
                if(rules=== undefined){
                    isValid=true;
                } else{
                    if(rules.required){
                        isValid= value.trim()!=='' && isValid;
                    }
    
                    if(rules.minLength){
                        isValid= value.length>= rules.minLength && isValid;
                    }
    
                    if(rules.maxLength){
                        isValid= isValid && value.length<=rules.maxLength;
                    }
                }
                
                

                return isValid;
        }

        

        onChangeHandler=(event,inputIdentifier )=>{
            console.log(event.target.value);
            const updatefrom={...this.state.orderForm};
            const updatefromElement={
                ...updatefrom[inputIdentifier]
            }
            updatefromElement.value=event.target.value;
            updatefromElement.valid=this.checkValidation(updatefromElement.value,updatefromElement.validation);
            updatefromElement.touched=true;
            updatefrom[inputIdentifier]=updatefromElement;
            let formIsValid=true;
            for(let input in updatefrom){
                formIsValid=updatefrom[input].valid && formIsValid;
            }

            this.setState({
                orderForm:updatefrom,
                formIsValid:formIsValid
            });

        }
        render(){
            const formElement =[];
            for(let keys in this.state.orderForm){
                formElement.push({
                    id:keys,
                    config:this.state.orderForm[keys]
                })
            }

            let form=
            <div>
            <h4> Enter Your Data</h4>
            <form onSubmit={this.orderSubmittHandler}>
                {formElement.map(formElement=>{
                    return <Input
                    label={formElement.config.elementConfig.placeholder} 
                    key={formElement.id}
                    inputtype={formElement.config.elementType}  
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    onChange={(event)=>this.onChangeHandler(event,formElement.id)}/>;
                })}
            
            <Button inputtype="input" className={classes.Input}  btnType="Success" clicked={this.orderSubmittHandler} disabled={!this.state.formIsValid}>Order</Button>
            </form>
            </div> ;
            if(this.props.loading){
                form=
                <div>
                <h4> Please Wait! Placing your order!</h4>
                <Spinner value={Math.floor((Math.random() * 4) + 1)}/>
                </div>;
            }
            return(
                <div className={classes.ContactData}>

                    {form}
                </div>
            );
        }
}

const mapStateToProps=states=>{
    return {
        ings:states.burgerBuilder.ingedrient,
        price:states.burgerBuilder.totalPrice,
        loading:states.order.loading
    }
};

const mapDispachToProps = dispatch =>{
    return {
     onOrderBurger : (orderData)=> dispatch(OrderAction.purchaseBurgerStart(orderData))
    }
    
}

export default connect(mapStateToProps,mapDispachToProps)(withErrorHandler(ContactData,axios));
import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import {Redirect} from 'react-router-dom';
class Auth extends Component {
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:8
                },
                valid:false,
                touched:false
            }  
        },
        isSignUp:true,
        show:true
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
    const updatefrom={...this.state.controls};
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
        controls:updatefrom,
        formIsValid:formIsValid
    });

}
submitHandler=(event)=>{
    event.preventDefault();
    if(this.state.isSignUp) {
    this.props.auth(this.state.controls.email.value,this.state.controls.password.value);
    } else{
        this.props.signin(this.state.controls.email.value,this.state.controls.password.value);
    }
}

signinHandler=()=>{
    this.setState(prevState=>{
        return{
            isSignUp:!prevState.isSignUp
        };
    })
}

    



    render(){
        const formElement =[];
        for(let keys in this.state.controls){
            formElement.push({
                id:keys,
                config:this.state.controls[keys]
            })
        }



        let form = formElement.map(formElement=>{
            
           return <Input 
            label={formElement.config.elementConfig.placeholder} 
                    key={formElement.id}
                    inputtype={formElement.config.elementType}  
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    onChange={(event)=>this.onChangeHandler(event,formElement.id)}/>

        
        } );
        if(this.props.loading){
            form=<Spinner/>
        }
        let error=null;
        
        if(this.props.error){
            error=<Modal show={this.state.show} modalClosed={this.props.modalHandler}>{this.props.error}</Modal>
            

        }
        let link=null;
        if(this.props.isAuthenticate){
            
            if(this.props.building){
                link=<Redirect to="/checkout"/>
            }else{
            link=<Redirect to="/"/>
            }
        }

        return(
            <div className={classes.Form}>
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button inputtype="Submit"   className={classes.Input}   btnType="Success">{this.state.isSignUp?'Sign-up' :'Sign-in'}</Button>
                </form>
                <Button inputtype="input"   className={classes.Input}   btnType="Danger" clicked={this.signinHandler}>Switch to {this.state.isSignUp?'Sign-in' :'Sign-up'}</Button>
                {error}
                {link}
            </div>
        );
    }

}


const mapStateToProps= state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticate:state.auth.token !==null,
        building:state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch =>{
    return {
    auth: (username,password)=>dispatch(actions.auth(username,password)),
    signin:(username,password)=>dispatch(actions.signin(username,password)),
    modalHandler:()=>dispatch(actions.modal())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);


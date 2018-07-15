import React from 'react';
import classes from './Input.css';
const input=(props)=>{
    let inputElement=null;
    let inputClasses=[classes.Inputelement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch(props.inputtype){
        case('input'):
            inputElement=<input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.onChange}/>;
            break;
        case('textarea'):
            inputElement=<textarea {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.onChange}/>;
            break;
        case('select'):
            inputElement=<select className={inputClasses.join(' ')}  onChange={props.onChange}>
                  {props.elementConfig.options.map(options=>{
                      return <option key={options.value} value={options.value}>
                        {options.displayVALUE}
                      </option>;
                  })}  
            </select>;
            break;
        default:
            inputElement=<input {...props.elementConfig} className={inputClasses} value={props.value.join(' ')} onChange={props.onChange}/>;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
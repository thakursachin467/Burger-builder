import * as actionTypes from './actions';
import axios from '../../axios-orders';

export const addIngedrients=(igName)=>{
    return {
       type:actionTypes.ADD_INGREDIENT,
       ingedrientName:igName
    }
}


export const removeIngedrients=(igName)=>{
    return {
       type:actionTypes.REMOVE_INGREDIENT,
       ingedrientName:igName
    }
}

export const setIngedrient=(ingedrients)=>{
    
    return{
        type:actionTypes.SET_INGEDRIENTS,
        ingedrients:ingedrients

    };
}

export const errorHandler=()=>{
    return{
        type:actionTypes.ERROR_HANDLER
    }
}

export const fetchIngedrients=()=>{
    return dispatch => {
        axios.get('https://react-burger-builder-2a539.firebaseio.com/ingedrient.json')
        .then((response)=>{
            dispatch(setIngedrient(response.data));
        })
        .catch((error)=>{
            dispatch(errorHandler());
        })
    };
}
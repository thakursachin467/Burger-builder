import * as actionTypes from './actions';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(id,orderData)=>{
        return{
            type:actionTypes.ORDER_SUCESS,
            orderId:id,
            orderData:orderData

        };
}


export const purchaseBurgerfail=(error)=>{

    return{
        type:actionTypes.ORDER_FAIL,
        error:error
    };
    
}


export const  purchaseBurgerStart=(orderData)=>{
        return dispatch=>{
            axios.post('/orders.json', orderData)
                    .then((response) => {
                        dispatch(purchaseBurgerSuccess(response.data,orderData))
                    })
                    .catch(error => {
                        dispatch(purchaseBurgerfail(error));
                    });

        }
}
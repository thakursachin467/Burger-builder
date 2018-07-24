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

export const purchaseStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}


export const  purchaseBurgerStart=(orderData,token,user)=>{
        return dispatch=>{
            dispatch(purchaseStart());
            axios.post('/orders.json?auth='+ token + '?user='+user, orderData)
                    .then((response) => {
                        dispatch(purchaseBurgerSuccess(response.data.name,orderData))
                    })
                    .catch(error => {
                        dispatch(purchaseBurgerfail(error));
                    });

        }
}

export  const purchaseNew =()=>{
    return {
        type:actionTypes.PURCHASE_NEW
    }
}
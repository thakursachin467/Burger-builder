import * as  actionTypes from '../actions/actions';

const initialState ={
    order:[],
    loading:false,
    purchasing:false
}

const order =(state=initialState,action)=>{
            switch(action.type){
                case(actionTypes.ORDER_SUCESS):
                const newOrder={
                    ...action.orderData,
                    id:action.orderId
                }
                    return {
                        ...state,
                        order:state.order.concat(newOrder),
                        loading:false,
                        purchasing:true
                    }
                case(actionTypes.ORDER_FAIL):
                    return{
                        ...state,
                        loading:false,
                        purchasing:true
                    }
                case(actionTypes.PURCHASE_BURGER_START):
                    return{
                        ...state,
                        loading:true
                    }
                case(actionTypes.PURCHASE_NEW):
                    return{
                        ...state,
                        purchasing:false
                    }
                default:
                    return state;
            }
}


export default order;
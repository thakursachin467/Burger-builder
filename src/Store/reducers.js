import * as actionTypes from './actions';

const initialState={
    ingedrient:{
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
    },
    totalPrice:40
};
 
const INGEDRIENT_PRICES={
    salad:30,
    bacon:20,
    meat:30,
    cheese:15
};
const reducer = (state=initialState,action)=>{
        switch(action.type){
            case actionTypes.ADD_INGREDIENT:
                return {
                    ...state,
                    ingedrient:{
                        ...state.ingedrient,
                        [action.ingedrientName]:state.ingedrient[action.ingedrientName] + 1
                    },
                    totalPrice:state.totalPrice+INGEDRIENT_PRICES[action.ingedrientName]
                }
            case actionTypes.REMOVE_INGREDIENT:
                return{
                    ...state,
                    ingedrient:{
                        ...state.ingedrient,
                        [action.ingedrientName]:state.ingedrient[action.ingedrientName] - 1
                    },
                    totalPrice:state.totalPrice-INGEDRIENT_PRICES[action.ingedrientName]
                }
            default:
                return state;

        }

}


export default reducer;
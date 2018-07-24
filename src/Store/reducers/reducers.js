import * as actionTypes from '../actions/actions';

const initialState={
    ingedrient:null,
    totalPrice:40,
    error:false,
    loading:false,
    building:false
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
                    totalPrice:state.totalPrice+INGEDRIENT_PRICES[action.ingedrientName],
                    building:true
                }
            case actionTypes.REMOVE_INGREDIENT:
                return{
                    ...state,
                    ingedrient:{
                        ...state.ingedrient,
                        [action.ingedrientName]:state.ingedrient[action.ingedrientName] - 1
                    },
                    totalPrice:state.totalPrice-INGEDRIENT_PRICES[action.ingedrientName],
                    building:true
                }
            case actionTypes.SET_INGEDRIENTS:
                return{
                    ...state,
                    ingedrient:action.ingedrients,
                    error:false,
                    totalPrice:40,
                    building:false
                }
            case actionTypes.ERROR_HANDLER:
                return{
                    ...state,
                    error:true
                };
                
            default:
                return state;

        }

}


export default reducer;
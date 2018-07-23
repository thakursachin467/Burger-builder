import * as actionTypes from '../actions/actions';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false
}

const reducers=(state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.AUTH_START):
            return{
                ...state,
                loading:true,
                error:null
            }
        case(actionTypes.AUTH_SUCCESS):
            return{
                ...state,
                token:action.idToken,
                userId:action.userId,
                error:null,
                loading:false
            }
        case(actionTypes.AUTH_FAIL):
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case(actionTypes.MODAL_CLOSED):
            return{
                ...state,
                error:null
            }
        case(actionTypes.LOGOUT):
            return{
                ...state,
                token:null,
                userId:null
            }
        default:
            return state;
    }
}


export default reducers;

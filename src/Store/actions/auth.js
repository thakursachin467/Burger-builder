import * as actionTypes from './actions';
import axios from 'axios';

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
};

export const authSucess=(authData)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        data:authData
    }
};



export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
};


export const  auth = (email,password)=>{
    return dispatch=>{
        const authData={
            email:email,
            password:password,
            returnSecureToken:true

        }
        dispatch(authStart());
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAf-I6xqbKLjFQJr6HbUcKU184R3n11RBk',authData)
        .then((response)=>{
            dispatch(authSucess(response.data));
            console.log(response.data);
        })
        .catch((error)=>{
            dispatch(authFail(error));
            console.log(error.response.data.error.message);

        })
    }
}
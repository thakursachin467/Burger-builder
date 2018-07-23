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
        idToken:authData.idToken,
        userId:authData.localId
    }
};

export const logout = ()=>{
    return {
        type:actionTypes.LOGOUT
    }
}

export const checkAuthTimeOut =(expiresInTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expiresInTime*1000);
    }
}

export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error.response.data.error.message
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
            dispatch(checkAuthTimeOut(response.data.expiresIn));
            console.log(response.data);
        })
        .catch((error)=>{
            dispatch(authFail(error));
            console.log(error.response.data.error.message);

        })
    }
}

export const modal=()=>{
    return{
    type:actionTypes.MODAL_CLOSED
    }
}

export const signin=(email,password)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAf-I6xqbKLjFQJr6HbUcKU184R3n11RBk',authData)
        .then((response)=>{
            dispatch(authSucess(response.data));
            console.log(response);
        })
        .catch((error)=>{
            dispatch(authFail(error));
            console.log(error);
        });
    }
}
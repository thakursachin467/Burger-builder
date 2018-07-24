import * as actionTypes from './actions';
import axios from 'axios';

export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
};

export const authSucess=(authDataToken,authDataId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:authDataToken,
        userId:authDataId
    }
};

export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
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
            
            dispatch(authSucess(response.data.idToken,response.data.idToken.localId));
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
            const expireDate=new Date(new Date().getTime() +response.data.expiresIn *1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expiresIn',expireDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSucess(response.data.idToken,response.data.localId));
            console.log(response);
        })
        .catch((error)=>{
            dispatch(authFail(error));
            console.log(error);
        });
    }
}


export const  authCheckState = ()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        const userId=localStorage.getItem('userId');
        if(!token){
            dispatch(logout());
        } else{
        const expireDate= new Date(localStorage.getItem('expiresIn'));
        if(expireDate>new Date()) {
            dispatch(authSucess(token,userId)); 
        } else {
            dispatch(logout(token,userId));
            dispatch(checkAuthTimeOut((expireDate.getTime()- new Date().getTime())/1000))
        }
        
        }
    }
}
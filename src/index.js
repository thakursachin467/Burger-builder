import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import reducer from './Store/reducers/reducers';
import thunk from 'redux-thunk';
import order from './Store/reducers/order';
import auth from './Store/reducers/auth';



const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducers=combineReducers({
    burgerBuilder:reducer,
    order:order,
    auth:auth
})
const store =createStore(rootReducers,composeEnhancers(applyMiddleware(thunk)));
const app =(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

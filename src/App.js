  import React, { Component } from 'react';
  import Layout from './components/Layout/Layout'
  import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
  import Checkout from './containers/Checkout/Checkout';
  import {Route, Switch } from 'react-router-dom';
  import Orders from './components/Orders/Orders';
  import Auth from './containers/Auth/Auth';

  class App extends Component {
    render() {
      return (
        <div >
        < Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout"  component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/Auth"  component={Auth}/>
          </Switch>
        </Layout>
        </div>
      );
    }
  }

  export default App;

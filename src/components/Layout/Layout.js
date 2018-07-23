    import React,{Component} from 'react';
    import Aux from '../../hoc/Aux';
    import classes from './Layout.css'
    import Toolbar from '../Navigation/Toolbar/Toolbar'
    import SideDrawer  from '../Navigation/Sidedrawer/Sidedrawer';
    import {connect} from 'react-redux';

    class Layout extends Component{
        state={
            show:false
        }
        sideDrawerClosedHandler = ()=>{
                this.setState({show:false})
        }
        sideDrawerOpenHandler=()=>{
            this.setState({show:true})
        }
       render() {
            return (
                <Aux>
                    <Toolbar open={this.sideDrawerOpenHandler} token={this.props.token}/>
                    <SideDrawer open={this.state.show} closed={this.sideDrawerClosedHandler} token={this.props.token}/>
                    <main className={classes.Content}> 
                            {this.props.children}
                    </main>
                </Aux>
        );
    }
    } 

    const mapPropsToState=(state)=>{
        return {
            token:state.auth.token!==null
        }
    }

    export  default connect(mapPropsToState)(Layout) ;
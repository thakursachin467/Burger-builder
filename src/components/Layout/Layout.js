    import React,{Component} from 'react';
    import Aux from '../../hoc/Aux';
    import classes from './Layout.css'
    import Toolbar from '../Navigation/Toolbar/Toolbar'
    import SideDrawer  from '../Navigation/Sidedrawer/Sidedrawer'

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
                    <Toolbar open={this.sideDrawerOpenHandler}/>
                    <SideDrawer open={this.state.show} closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}> 
                            {this.props.children}
                    </main>
                </Aux>
        );
    }
    } 

    export  default Layout ;
import React,{Component} from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
        state={
            name:' ',
            email:' ',
            address:{
                street:' ',
                zipcode:' '
            },
            loading:false
        }
        orderSubmittHandler=(event)=> {
                event.preventDefault();
                console.log(this.props.ingedrient);  
                this.setState({loading:true});
                const order = {
                    ingedrient: this.props.ingedrient,
                    price: this.props.price,
                    customer: {
                        name: "sachin Thakur",
                        address: {
                            street: "Test",
                            zipcode: "143001",
                            country: "India"
                        },
                        email: "test@test.com"
                    },
                    deliveryMethod: "Prime"
                }
                axios.post('/orders.json', order)
                    .then((response) => {
                        this.setState({
                            loading: false
                        });
                        console.log(response);
                        this.props.history.push('/');
                    })
                    .catch(error => {
                        this.setState({
                            loading: false
                        });
                        console.log(error)
                    });
        }
        render(){
            let form=
            <div>
            <h4> Enter Your Data</h4>
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Your Zip code"/>
            <Button className={classes.Input}  btnType="Success" clicked={this.orderSubmittHandler}>Order</Button>
            </form>
            </div> ;
            if(this.state.loading){
                form=
                <div>
                <h4> Please Wait! Placing your order!</h4>
                <Spinner/>
                </div>;
            }
            return(
                <div className={classes.ContactData}>
                    
                    {form}
                </div>
            );
        }
}

export default ContactData;
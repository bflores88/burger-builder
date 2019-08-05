import React, { Component } from 'react';
import classes from './ContactData.module.css';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,

  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients)
    this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			// Note: total price should be calculated on the server to ensure the total price is not manipulated on the front-end!!
			price: this.props.price,
			customer: {
				name: 'Brenda',
				address: {
					street: 'test',
					zipCode: '23123',
					country: 'US',
				},
				email: 'test@test.com',
				deliveryMethod: 'fastest',
			},
		};
		axios
			.post('/orders.json', order)
			.then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/')
			})
			.catch((error) => {
				this.setState({ loading: false });
				console.log('error', error);
    	});
  }

  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
        <Input inputtype="input" type="email " name="email" placeholder="Your Email" />
        <Input inputtype="input" type="text" name="street" placeholder="Street" />
        <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    };

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>

    )
  }
}

export default ContactData;
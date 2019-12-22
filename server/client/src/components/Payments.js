import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <ReactStripeCheckout
                name='Emaily'
                description='$5 for 5 Email Credits'
                amount={500}
                token={(token) => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </ReactStripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);
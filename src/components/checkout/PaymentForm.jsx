import React, { useState } from 'react'
import { Typography, Button, Divider, Container } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'
import { Link } from "react-router-dom";

//needs the strip key here
const stripePromise = loadStripe('...');

const PaymentForm = ({ shippingData, checkoutToken, prevStep }) => {
    const [confirmation, setConfirmationState] = useState(false);

    const Confirmation = () => (
        <>
        <div>
          <Typography variant="h5">Thank you for your purchase, {shippingData.firstName} {shippingData.lastName}!</Typography>
          <Divider />
          <Typography variant="subtitle2">Order ref: ORDER100</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );

    const PaymentForm = () => (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0'}}>Payment Method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {(elements, stripe) => (
                        <form>
                            <CardElement/>
                            <br/><br/>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={prevStep}>Back</Button>
                                <Button variant="contained" type="button" onClick={() => setConfirmationState(true)}  color="primary">
                                    Pay { checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    );

    return (
        <Container>
            { confirmation ? <Confirmation/> : <PaymentForm/> }
        </Container>
    )
}

export default PaymentForm

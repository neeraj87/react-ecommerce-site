import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CssBaseline } from "@material-ui/core";
import useStyles from './styles';
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { commerce } from "../../lib/commerce";
const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveState] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                
            }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveState((prevActiveStep) => prevActiveStep + 1);
    const prevStep = () => setActiveState((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} prevStep={prevStep}/>;

    const Confirmation = () => (
        <h3>Confirmation</h3>
    );

    return (
        <>
            <CssBaseline/>
            <div classeName={classes.toolbar}></div>
            <main classeName={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h6">Shipping Address</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    { activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout

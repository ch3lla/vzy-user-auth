import Stripe from 'stripe';
import User from '../models/User.js';
import errorHandler from '../utils/handleError.js';

const pay = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_TEST_KEY);
    const { email } = req.body;
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 7500,
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
            receipt_email: email,
        });

        res.json({ 'client_secret': paymentIntent.client_secret });
    } catch (error) {
        errorHandler(error, res);
    }
};

const webhook = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_TEST_KEY);
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.ENDPOINT_SECRET;

    try {
        const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

        if (event.type === 'payment_intent.succeeded') {
            const userId = req.headers['x-user-id'] || event.data.object.metadata['x-user-id'];
            if (!userId) throw new Error('User ID not provided in request or event metadata.');

            await User.findByIdAndUpdate(userId, { status: 'paid' });
        } else {
            throw new Error(`Unhandled event type: ${event.type}.`);
        }

        res.status(200).send();
    } catch (error) {
        errorHandler(error, res);
    }
};

export { pay, webhook };

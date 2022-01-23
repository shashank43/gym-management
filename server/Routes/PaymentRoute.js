import express from 'express';
import getPayments from '../Controllers/Payment/getPayments.js';
import getPayment from '../Controllers/Payment/getPayment.js'
import addPayment from '../Controllers/Payment/addPayment.js'
import deletePayment from '../Controllers/Payment/deletePayment.js';

const PaymentRoute = express.Router();

PaymentRoute.get('/', getPayments);
PaymentRoute.get('/:clientId', getPayment);
PaymentRoute.post('/', addPayment);
PaymentRoute.delete('/:_id', deletePayment);

export default PaymentRoute;
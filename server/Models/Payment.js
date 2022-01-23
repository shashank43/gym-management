import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const paymentSchema = mongoose.Schema({
    clientId: String,
    amount: String,
    dateOfPayment: String
});

autoIncrement.initialize(mongoose.connection);
paymentSchema.plugin(autoIncrement.plugin, 'Payment');

const Payment = mongoose.model('payment', paymentSchema);

export default Payment;
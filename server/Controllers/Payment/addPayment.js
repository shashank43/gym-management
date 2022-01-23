import Payment from "../../Models/Payment.js";

async function addPayment(req, res) {
    const receivedPayment = req.body;
    const newPayment = new Payment(receivedPayment);

    try {
        newPayment.save();
        res.json('Payment confirmed');
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default addPayment;
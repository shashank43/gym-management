import Payment from "../../Models/Payment.js";

async function deletePayment(req, res) {
    const receivedId = req.params._id;
    try {
        await Payment.deleteOne({ _id: receivedId });
        res.json('Member deleted')
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default deletePayment;
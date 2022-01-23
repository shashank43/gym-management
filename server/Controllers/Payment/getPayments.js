import Payment from "../../Models/Payment.js";

async function getPayments(req, res) {
    try {
        let allPayments = await Payment.find();
        res.send(allPayments);
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default getPayments;
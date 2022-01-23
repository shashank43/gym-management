import Payment from '../../Models/Payment.js';

async function getPayment(req, res) {
    let reqClientId = req.params.clientId;
    reqClientId = reqClientId.toString();
    try {
        let allPayments = await Payment.find();
        let allPaymentOfClient = [];
        for(let i = 0; i < allPayments.length; i++) {
            if(allPayments[i].clientId === reqClientId) {
                allPaymentOfClient.push(allPayments[i]);
            }
        }
        res.json(allPaymentOfClient);
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default getPayment;
import axios from "axios";

const url = "http://localhost:8000/payments";

export async function getPayments() {
    return await axios.get(url);
}

export async function getPayment(clientId) {
    return await axios.get(url + '/' + clientId);
}

export async function addPayment(payment) {
    return await axios.post(url, payment);
}

export async function deletePayment(_id) {
    return await axios.delete(url + '/' + _id);
}
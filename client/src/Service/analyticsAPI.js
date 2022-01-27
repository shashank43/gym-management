import axios from "axios";

const url = "http://localhost:8000/analytics";

export async function getAnalytics() {
    return await axios.get(url);
}

export async function getExpiredMemberships() {
    return await axios.get(url + '/expired-memberships');
}
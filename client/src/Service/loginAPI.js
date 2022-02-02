import axios from "axios";

const url = "http://localhost:8000/login";

export async function loginUser(user) {
    return await axios.post(url, user);
}
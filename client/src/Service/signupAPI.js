import axios from "axios";

const url = "http://localhost:8000/signup";

export async function signupUser(user) {
    return await axios.post(url, user);
}
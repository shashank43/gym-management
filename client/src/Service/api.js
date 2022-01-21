import axios from 'axios';

const url = 'http://localhost:8000/members';

export async function getMembers() {
    return await axios.get(url);
}
export async function addMember(member) {
    return await axios.post(url, member);
}

export async function deleteMember(_id) {
    return await axios.delete(url + "/" + _id);
}
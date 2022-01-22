import axios from 'axios';

const url = 'http://localhost:8000/members';

export async function getMembers() {
    return await axios.get(url);
}

export async function getMember(_id) {
    return await axios.get(url + '/' + _id);
}

export async function addMember(member) {
    return await axios.post(url, member);
}

export async function editMember(_id, member) {
    return await axios.put(url + '/' + _id, member);
}

export async function deleteMember(_id) {
    return await axios.delete(url + "/" + _id);
}
import Member from "../Models/Member.js";

async function editMember(req, res) {
    const receivedMember = req.body;
    const editedMember = new Member(receivedMember);
    const receivedId = req.params._id;
    try {
        await Member.updateOne({ _id: receivedId }, editedMember);
        res.json('Member Edited');
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default editMember;
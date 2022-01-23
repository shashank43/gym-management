import Member from '../../Models/Member.js';

async function addMember(req, res) {
    const receivedMember = req.body;
    const newMember = new Member(receivedMember);

    try {
        await newMember.save();
        res.json('Member added');
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default addMember;
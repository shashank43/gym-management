import Member from '../../Models/Member.js';

async function deleteMember(req, res) {
    const receivedId = req.params._id;
    try {
        await Member.deleteOne({ receivedId });
        res.json('Member deleted');
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default deleteMember;
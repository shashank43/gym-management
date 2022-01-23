import Member from '../../Models/Member.js';

async function getMember(req, res) {
    const _id = req.params._id;
    try {
        let member = await Member.findById(_id);
        res.json(member);
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default getMember;
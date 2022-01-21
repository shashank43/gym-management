import Member from '../Models/Member.js'

async function getMembers(req, res) {
    try {
        let allMembers = await Member.find();
        res.json(allMembers);
    } catch (error) {
        res.json({ message : error.message });
    }
}

export default getMembers;
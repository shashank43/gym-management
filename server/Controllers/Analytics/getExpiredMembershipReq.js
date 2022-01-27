import Member from "../../Models/Member.js";
import getExpiredMemberships from './getExpiredMemberships.js';

async function getExpiredMembershipReq(req, res) {
    let allMembers = await Member.find();
    let expiredMembers = getExpiredMemberships(allMembers);
    res.json({expiredMembers});
}

export default getExpiredMembershipReq;
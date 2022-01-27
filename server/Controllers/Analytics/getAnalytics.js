import Member from '../../Models/Member.js';
import Payment from '../../Models/Payment.js';
import getRevenue from './getRevenue.js';
import getMembersGained from './getMembersGained.js';
import getExpiredMemberships from './getExpiredMemberships.js';

async function getAnalytics(req, res) {
    const allMembers = await Member.find();
    const allPayments = await Payment.find();
    
    let totalMembers = allMembers.length;
    let expiredMemberships = getExpiredMemberships(allMembers);
    let feesPaidMembers = totalMembers - expiredMemberships.length;
    let revenueMap = getRevenue(allPayments)
    revenueMap = Object.fromEntries(revenueMap);
    let membersGained = getMembersGained(allMembers);
    membersGained = Object.fromEntries(membersGained);
    res.json({totalMembers, feesPaidMembers, expiredMemberships, revenueMap, membersGained});
}

export default getAnalytics;
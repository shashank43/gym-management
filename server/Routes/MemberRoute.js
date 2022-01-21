import express from 'express';
import addMember from '../Controllers/addMember.js';
import getMembers from '../Controllers/getMembers.js';
import deleteMember from '../Controllers/deleteMember.js';

const MemberRoute = express.Router();

MemberRoute.get('/', getMembers);
MemberRoute.post('/', addMember);
MemberRoute.delete('/:_id', deleteMember);

export default MemberRoute;
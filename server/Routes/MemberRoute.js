import express from 'express';
import addMember from '../Controllers/Member/addMember.js';
import getMembers from '../Controllers/Member/getMembers.js';
import deleteMember from '../Controllers/Member/deleteMember.js';
import getMember from '../Controllers/Member/getMember.js';
import editMember from '../Controllers/Member/editMember.js';

const MemberRoute = express.Router();

MemberRoute.get('/', getMembers);
MemberRoute.get('/:_id', getMember);
MemberRoute.post('/', addMember);
MemberRoute.put('/:_id', editMember);
MemberRoute.delete('/:_id', deleteMember);

export default MemberRoute;
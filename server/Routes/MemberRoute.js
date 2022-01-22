import express from 'express';
import addMember from '../Controllers/addMember.js';
import getMembers from '../Controllers/getMembers.js';
import deleteMember from '../Controllers/deleteMember.js';
import getMember from '../Controllers/getMember.js';
import editMember from '../Controllers/editMember.js';

const MemberRoute = express.Router();

MemberRoute.get('/', getMembers);
MemberRoute.get('/:_id', getMember);
MemberRoute.post('/', addMember);
MemberRoute.put('/:_id', editMember);
MemberRoute.delete('/:_id', deleteMember);

export default MemberRoute;
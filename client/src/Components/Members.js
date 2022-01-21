import React, { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";

import { Link } from 'react-router-dom';

import { getMembers, deleteMember } from "../Service/api";

function Members() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        getAllMembers();
    }, []);

    async function getAllMembers() {
        const response = await getMembers();
        setMembers(response.data);
    }

    async function HandleDeleteMember(_id) {
        await deleteMember(_id);
        getAllMembers();
    }

    return <>
        <Table className="members-table" sx={{width:"80%"}}>
            <TableHead className="table-head">
                <TableRow>  
                    <TableCell className="table-cell">Member ID</TableCell>
                    <TableCell className="table-cell">First Name</TableCell>
                    <TableCell className="table-cell">Last Name</TableCell>
                    <TableCell className="table-cell">Contact Number</TableCell>
                    <TableCell className="table-cell">Gender</TableCell>
                    <TableCell className="table-cell">End of Membership</TableCell>
                    <TableCell className="table-cell"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {members.map((member) => (
                    <TableRow>
                        <TableCell>{member._id}</TableCell>
                        <TableCell>{member.firstName}</TableCell>
                        <TableCell>{member.lastName}</TableCell>
                        <TableCell>{member.contactNumber}</TableCell>
                        <TableCell>{member.gender}</TableCell>
                        <TableCell>{member.endOfMembership}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" style={{marginRight: 20}} component={Link} to={`/edit-member/${member._id}`}>Edit</Button>
                            <Button variant="contained" color="error" onClick={() => HandleDeleteMember(member._id)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
}

export default Members;
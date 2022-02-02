import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { getMembers } from "../Service/api";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Members() {
    const [members, setMembers] = useState([]);
    const [searched, setSearched] = useState("");
    const [originalRows, setOriginalRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMembers();
    }, []);

    async function getAllMembers() {
        const token = localStorage.getItem('token');
        if(token) {
            const user = jwt_decode(token);
            //we can apply backend login to check if user is legit
            console.log(user);
        }
        else {
            navigate('/login');
        }
        const response = await getMembers();
        setOriginalRows(response.data);
        setMembers(response.data);
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
             return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setMembers(filteredRows);
      };
    
      const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };

    return <>
        <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          className="search-bar"
        />

        <Table className="members-table" sx={{width:"100%"}}>
        <TableHead className="table-head }" >
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
                            <Button variant="contained" className="new-payment-btn" style={{marginRight: 20}} component={Link} to={`/new-payment/${member._id}`}>New Payment</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </Paper>
    </>
}

export default Members;
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { getExpiredMemberships } from "../Service/analyticsAPI";
import Grid from '@mui/material/Grid';
// import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

function Home() {
    const [feesDueMembers, setFeesDueMembers] = useState([]);
    const [searched, setSearched] = useState("");
    const [originalRows, setOriginalRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        initializeHome();
    }, []);

    async function initializeHome() {
        const token = localStorage.getItem('token');
        if(token) {
            const user = jwt_decode(token);
            //we can apply backend login to check if user is legit
            console.log(user);
        }
        else {
            navigate('/login');
        }
        
        // if(token) {
        //     const user = jwt.decode(token);
        //     if(!user) {
        //         localStorage.removeItem('token');
        //         navigate('/login');
        //     }
        // }
        // else {
        //     navigate('/login');
        // }

        const response = await getExpiredMemberships();
        setOriginalRows(response.data.expiredMembers);
        setFeesDueMembers(response.data.expiredMembers);
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
             return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setFeesDueMembers(filteredRows);
      };
    
      const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };

    return <>
        
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <h3>Fees Due</h3>
        </Grid>
        <Grid item xs={12} lg={8}>
        <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          className="search-bar"
        />

        <Table className="members-table" sx={{width:"100%"}}>
        <TableHead className="table-head" >
                <TableRow>
                    <TableCell className="table-cell">Member ID</TableCell>
                    <TableCell className="table-cell">First Name</TableCell>
                    <TableCell className="table-cell">Last Name</TableCell>
                    <TableCell className="table-cell">Contact Number</TableCell>
                    <TableCell className="table-cell">Gender</TableCell>
                    <TableCell className="table-cell">End of Membership</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {feesDueMembers.map((member) => (
                    <TableRow>
                        <TableCell>{member._id}</TableCell>
                        <TableCell>{member.firstName}</TableCell>
                        <TableCell>{member.lastName}</TableCell>
                        <TableCell>{member.contactNumber}</TableCell>
                        <TableCell>{member.gender}</TableCell>
                        <TableCell>{member.endOfMembership}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
                <Button variant="contained" component={Link} to={`/add-member`} style={{backgroundColor: "#757ce8", padding: 10, borderRadius: 2, marginLeft: 20, marginRight: 20}}>Add New Member</Button>
                <Button variant="contained" component={Link} to={`/payments`} style={{backgroundColor: "#118C4F", padding: 10, borderRadius: 2}}>New Payment</Button>
        </Grid>

        </Grid>
    </>
}

export default Home;
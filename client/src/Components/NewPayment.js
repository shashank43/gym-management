import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";
import { getMember, editMember } from "../Service/api";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { addPayment, getPayment, deletePayment } from "../Service/paymentsAPI";
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
}  

function todaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

//add one month to the end of membership date
// function addMonths(currDate) {
//     let arr = currDate.split('-');
//     arr[1]++;
//     if(arr[1] === 13) {
//         arr[1] = 1;
//         arr[0]++;
//     }
//     let ans = arr[0] + "-" + arr[1] + "-" + arr[2];
//     return ans;
// }

const initialObject = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    gender: 'male',
    joining: '',
    endOfMembership: ''
}

const initialPayment = {
    _id: '',
    clientId: '',
    amount: '',
    dateOfPayment: ''
}

function NewPayment() {
    const { _id } = useParams();
    const [member, setMember] = useState(initialObject);
    const { firstName, lastName, contactNumber } = member;
    const [valueJoin, setValueJoin] = React.useState(null);
    const [valueEnd, setValueEnd] = React.useState(null);
    const [amount, setAmount] = React.useState("");
    const [payment, setPayment] = React.useState(initialPayment);
    const [payments, setPayments] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadMemberData();
    }, []);

    async function loadMemberData() {
        const response = await getMember(_id);
        setMember(response.data);
        const arr1 = response.data.joining.split('-');
        const arr2 = response.data.endOfMembership.split('-');
        const str1 = arr1[2] + "-" + arr1[1] + "-" + arr1[0];
        const str2 = arr2[2] + "-" + arr2[1] + "-" + arr2[0];
        const date1 = Date.parse(str1);
        const date2 = Date.parse(str2);
        setValueJoin(date1);
        setValueEnd(date2);

        const responsePayment = await getPayment(_id);
        setPayments(responsePayment.data);
        console.log(responsePayment.data);

        //add one month to end of membership date by default when the page loads
        //let newDateStr = addMonths(str2);
        //const newDate = Date.parse(newDateStr);
        //setMember({...member, endOfMembership: newDateStr});
        //setValueEnd(newDate);
    }

    async function HandleConfirmPayment() {
        //edit member here and confirm the new payment
        await editMember(_id, member);
        await addPayment(payment);
        navigate('/');
    }

    function HandleAmountChange(event) {
        setAmount(event.target.value);
        let currDate = todaysDate();
        setPayment({...payment,  clientId: _id, amount: event.target.value, dateOfPayment: currDate});
    }

    async function HandleDeletePayment(_id) {
        await deletePayment(_id);
        loadMemberData();
    }

    return <>
        <Grid container spacing={2}>
            
            <Grid item xs={12} md={8}>
                <Paper className="payment-form">
                    <Typography variant="h5" component="div">
                        {firstName} {lastName}
                    </Typography>
                    <Typography sx={{ mb: 1.5, marginTop: 2, marginBottom: 3 }} color="text.secondary">
                        {contactNumber}
                    </Typography>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <span style={{margin: 10, fontSize: 35}}>&#8377;</span>
                        </Grid>
                        <Grid item xs={5}>           
                            <TextField id="outlined-basic" variant="outlined" value={amount} onChange={(event) => HandleAmountChange(event)}/>
                        </Grid>
                        <Grid item xs={6}>
                            <div className='date-picker-payment'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label='End of Membership'
                                    value={valueEnd}
                                    onChange={(newValue) => {
                                        setValueEnd(newValue);
                                        let endDate = convert(newValue).toString();
                                        setMember({...member, endOfMembership : endDate});
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                </LocalizationProvider>
                            </div>
                        </Grid>    
                    </Grid>
                    <div className="confirm-payment">
                        <Button variant="contained" onClick={HandleConfirmPayment}>Confirm Payment</Button>
                    </div>
                </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper className="payment-history">
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Payment history
                    </Typography>
                    <Table className="members-table" sx={{width:"100%"}}>
                        <TableHead className="table-head }" >
                            <TableRow> 
                                <TableCell className="table-cell">Date of Payment</TableCell>
                                <TableCell className="table-cell">Amount</TableCell>
                                <TableCell className="table-cell"></TableCell>
                            </TableRow> 
                        </TableHead>
                        <TableBody>
                            {payments.map((record) => (
                            <TableRow> 
                                <TableCell>{record.dateOfPayment}</TableCell>
                                <TableCell>{record.amount}</TableCell>
                                <TableCell className="table-cell"> <DeleteIcon onClick={() => {HandleDeletePayment(record._id)}}/> </TableCell>
                            </TableRow>
                            ))} 
                        </TableBody>
                    </Table>
                    
                </Paper>  
            </Grid>

        </Grid>
    </>
}

export default NewPayment;
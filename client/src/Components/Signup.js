import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { signupUser } from '../Service/signupAPI';

const initialObject = {
    username: '',
    password: ''
};

function Signup() {
    const [user, setUser] = useState(initialObject);
    const navigate = useNavigate();

    function HandleChange(event) {
        setUser({...user, [event.target.name] : event.target.value});
    }
 
    async function Signup() {
        console.log(user);
        const response = await signupUser(user);
        console.log(response.data);

        // console.log(response.data);
        // if(response.data.message === "Logged In") {
        //     navigate('/home');
        // }
    }

    return <>
        <Paper className='login-paper'>
            <h3>Signup</h3>
            <TextField id="outlined-basic" label="Username" variant="outlined" name='username' className='username' onChange={(event) => {HandleChange(event)}}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" name='password' className='password' onChange={(event) => {HandleChange(event)}} type="password"/>
            <Button variant="contained" className='login-btn' onClick={Signup}>Signup</Button>
        </Paper>
    </>
}

export default Signup;

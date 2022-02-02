import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../Service/loginAPI';

const initialObject = {
    username: '',
    password: ''
};

function Login() {
    const [user, setUser] = useState(initialObject);
    const navigate = useNavigate();

    function HandleChange(event) {
        setUser({...user, [event.target.name] : event.target.value});
    }
 
    async function Login() {
        const response = await loginUser(user);
        console.log(response.data);
        
        if(response.data.user) {    //if user exists
            navigate('/');
        }
        else {
            alert('Invalid username or password');
        }
    }

    return <>
        <Paper className='login-paper'>
            <h3>Login</h3>
            <TextField id="outlined-basic" label="Username" variant="outlined" name='username' className='username' onChange={(event) => {HandleChange(event)}}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" name='password' className='password' onChange={(event) => {HandleChange(event)}} type="password"/>
            <Button variant="contained" className='login-btn' onClick={Login}>Login</Button>
        </Paper>
    </>
}

export default Login;

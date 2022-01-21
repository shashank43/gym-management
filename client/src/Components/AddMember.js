import React, { useState } from "react";

import { addMember } from '../Service/api';

import FormGroup from '@mui/material/FormGroup';
import { Button, FormControl, Input, InputLabel, FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useNavigate } from "react-router-dom";

function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
}  

const initialObject = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    gender: 'male',
    joining: '',
    endOfMembership: ''
}

function AddMember() {
    const [member, setMember] = useState(initialObject);
    const { firstName, lastName, contactNumber, gender } = member;
    const [valueJoin, setValueJoin] = React.useState(null);

    const navigate = useNavigate();

    function onValueChange(event) {
        setMember({...member, [event.target.name] : event.target.value});
    }

    async function HandleAddMember() {
        await addMember(member);
        // console.log("here");
        // console.log(member);
        setMember(initialObject);
        navigate('/members');
    }

    function HandleReset() {
        setMember(initialObject);
    }

    return <>
        <FormGroup className="add-member-form">
            <FormControl className="form-field">
                <InputLabel>First Name</InputLabel>
                <Input onChange={(event) => onValueChange(event)} name='firstName' value={firstName}/>
            </FormControl>

            <FormControl className="form-field">
                <InputLabel>Last Name</InputLabel>
                <Input onChange={(event) => onValueChange(event)} name='lastName' value={lastName}/>
            </FormControl>
            
            <FormControl className="form-field">
                <InputLabel>Contact Number</InputLabel>
                <Input onChange={(event) => onValueChange(event)} name='contactNumber' value={contactNumber}/>
            </FormControl>
            
            <FormControl component="fieldset"  className="form-field">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup 
            row 
            aria-label="gender" 
            name="row-radio-buttons-group"
            defaultValue="male"
            value={gender}
            >
                <FormControlLabel value="male" control={<Radio />} label="Male"  onClick={(event) => onValueChange(event)} name='gender'/>
                <FormControlLabel value="female" control={<Radio />} label="Female" onClick={(event) => onValueChange(event)} name='gender'/>
                <FormControlLabel value="other" control={<Radio />} label="Other" onClick={(event) => onValueChange(event)} name='gender'/>
            </RadioGroup>
            </FormControl>   
            
            <div className="dates">
                <div className='date-picker'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                        label='Joining Date'
                        value={valueJoin}
                        onChange={(newValue) => {
                            setValueJoin(newValue);
                            let joinDate = convert(newValue).toString();
                            console.log(joinDate);
                            setMember({...member, joining : joinDate, endOfMembership : joinDate});
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                {/* <div className='date-picker'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                        label='End of Membership'
                        value={valueEnd}
                        onChange={(newValue) => {
                            setValueEnd(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </div> */}
            </div>
            
            <div className="outer form-field">
                <Button variant="contained" className="inner add-member-btn" onClick={HandleAddMember}>Add Member</Button>
                <Button variant="outlined" className="inner reset-btn" onClick={HandleReset}>Reset</Button>
            </div>
        </FormGroup>
    </>
}

export default AddMember;
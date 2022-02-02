import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();

    useEffect(() => {
        initializeSettings();
    }, []);

    async function initializeSettings() {
        const token = localStorage.getItem('token');
        if(token) {
            const user = jwt_decode(token);
            //we can apply backend login to check if user is legit
            console.log(user);
        }
        else {
            navigate('/login');
        }
    }

    return <>
        <h1>This is Settings</h1>
    </>
}

export default Settings;
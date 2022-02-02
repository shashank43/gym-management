import React, { useEffect, useState } from "react";
import DoughnutChart from "./Charts/DoughnutChart";
import LineChart from "./Charts/LineChart";
import { getAnalytics } from "../Service/analyticsAPI";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const initialDataDoughnutChart = {
    labels: [
      'Fees Paid',
      'Fees Due',
    ],
    datasets: [{
      label: 'Membership',
      data: [1, 1],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)',
      ],
      hoverOffset: 4
    }]
};

const initialDataLineChart = {
    labels: [],
    datasets: [{
      label: '',
      data: []
    }]
};

function Analytics() {
    const [memberData, setMemberData] = useState(initialDataDoughnutChart);
    const [membersGained, setMembersGained] = useState(initialDataLineChart);
    const [revenue, setRevenue] = useState(initialDataLineChart);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAnalytics();
    }, []);
    
    async function getAllAnalytics() {
        const token = localStorage.getItem('token');
        if(token) {
            const user = jwt_decode(token);
            //we can apply backend login to check if user is legit
            console.log(user);
        }
        else {
            navigate('/login');
        }
        const response = await getAnalytics();
        HandleDoughnutChart(response.data);
        HandleMembersGained(response.data);
        HandleRevenueEarned(response.data);
    }

    function HandleDoughnutChart(myData) {
        let totalMembers = myData.feesPaidMembers;
        let feesPaidMembers = myData.feesPaidMembers;
        let expiredMembers = myData.expiredMemberships.length;
        let arr = [{
            label: 'Memberships',
            data: [feesPaidMembers, expiredMembers],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
        }];
        setMemberData({...memberData, datasets : arr});
    }

    function HandleMembersGained(myData) {
        const months = Object.keys(myData.membersGained);
        const membersJoined = [];
        for(let i = 0; i < months.length; i++) {
            membersJoined.push(myData.membersGained[months[i]]);
        }
        const myObject = {
            labels: months,
            datasets: [{
              label: 'Users gained',
              data: membersJoined,
              borderColor: '#9c0606'
            }]
        };
        setMembersGained(myObject);
    }

    function HandleRevenueEarned(myData) {
        const months = Object.keys(myData.revenueMap);
        const revenue = [];
        for(let i = 0; i < months.length; i++) {
            revenue.push(myData.revenueMap[months[i]]);
        }
        const myObject = {
            labels: months,
            datasets: [{
              label: 'Revenue Earned',
              data: revenue,
              borderColor: '#08018c'
            }]
        };
        setRevenue(myObject);
    }

    return <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper variant="outlined" elevation={1} style={{padding: 30, marginRight: 20}}>
                    <LineChart chartData = {membersGained}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper variant="outlined" elevation={1} style={{padding: 30, marginRight: 20}}>
                    <LineChart chartData = {revenue} />
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper variant="outlined" elevation={1} style={{padding: 30, marginRight: 20}}>
                    <DoughnutChart chartData = {memberData}/>
                </Paper>
            </Grid>
        </Grid>
    </>
}

export default Analytics;
import React from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

function LineChart(props) {
    return <>
        <Line 
            data={props.chartData}
            
        />
    </>
}

export default LineChart;
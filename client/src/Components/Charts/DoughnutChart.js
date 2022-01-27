import React from "react";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
};

const option = {
    plugins: {
      tooltip: {
        responsive : true,
        callbacks: {
          title: function () {
            return "";
          }
        }
      },
      legend: { display: true },
      title: {
        display: true,
        text: "MemberShip",
        position: "top"
      }
    }
};

function DoughnutChart(props) {
    return <>
      <Doughnut 
        data = {props.chartData}
        options={option}
      />
    </>
}

export default DoughnutChart;
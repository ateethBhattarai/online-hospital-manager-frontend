import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import axiosClient from '../../Services/axios';


const BarChart = () => {
    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {
        axiosClient.get('/count/appointmentWeek')
            .then(response => {
                setAppointmentData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // to extract week labels and appointment counts from the data
    const weekLabels = appointmentData.map(item => item.week);
    const appointmentCounts = appointmentData.map(item => item.count);

    // the chart data
    const chartData = {
        labels: weekLabels,
        datasets: [
            {
                label: 'Appointment Count',
                data: appointmentCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    // chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                precision: 0,
            },
        },
    };

    return (
        <div>
            <h2>Appointment Count by Week</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;

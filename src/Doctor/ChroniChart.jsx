import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axiosClient from '../Services/axios';
import { Chart as ChartJS } from 'chart.js/auto'

const ChroniChart = () => {
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        axiosClient.get('/count/chronicDiseases').then((res) => {
            setDiseases(res.data);
        });
    }, []);

    // Convert the fetched data to the required format for the chart
    const chartData = {
        labels: diseases.map((disease) => disease.chronic_disease),
        datasets: [
            {
                data: diseases.map((disease) => disease.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div style={{ width: "500px" }}>
            <Pie data={chartData} />
        </div>
    );
}

export default ChroniChart
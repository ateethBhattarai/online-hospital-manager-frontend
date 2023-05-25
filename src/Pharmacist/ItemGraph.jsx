import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import axiosClient from '../Services/axios';

const ItemGraph = () => {
    const [itemCounts, setItemCounts] = useState([]);

    useEffect(() => {
        axiosClient.get('/count/itemType')
            .then((response) => {
                setItemCounts(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching item counts:', error);
            });
    }, []);

    // Extract labels and counts from the API response
    const labels = itemCounts.map((item) => item.item_type);
    const counts = itemCounts.map((item) => item.count);

    // Bar chart data
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Item Counts',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    // Bar chart options
    const options = {
        responsive: true,
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
            <h2>Item Counts Bar Graph</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ItemGraph;

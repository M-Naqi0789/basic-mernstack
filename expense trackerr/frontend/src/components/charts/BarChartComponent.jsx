import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChartComponent = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Expenses' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const data = {
    labels: chartData.map(d => d.month), // e.g., ['Jan 2024', 'Feb 2024']
    datasets: [
      {
        label: 'Total Expenses ($)',
        data: chartData.map(d => d.amount), // e.g., [1200, 950]
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChartComponent;
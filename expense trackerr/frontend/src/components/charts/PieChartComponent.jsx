import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Expense Breakdown by Category' },
    },
  };

  const data = {
    labels: chartData.map(d => d.category), // e.g., ['Food', 'Rent', 'Travel']
    datasets: [
      {
        data: chartData.map(d => d.amount), // e.g., [500, 1500, 300]
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return <Pie options={options} data={data} />;
};

export default PieChartComponent;
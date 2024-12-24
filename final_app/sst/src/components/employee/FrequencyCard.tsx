import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Frequency } from '../../types';

interface FrequencyCardProps {
  hourlyFrequency: Frequency;
  dailyFrequency: Frequency;
}

export const FrequencyCard: React.FC<FrequencyCardProps> = ({ hourlyFrequency, dailyFrequency }) => {
  const hourlyData = {
    labels: Object.keys(hourlyFrequency),
    datasets: [
      {
        label: 'Messages per Hour',
        data: Object.values(hourlyFrequency),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Message Frequency',
        color: 'white',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Message Frequency</h2>
      <Bar data={hourlyData} options={options} />
    </div>
  );
};
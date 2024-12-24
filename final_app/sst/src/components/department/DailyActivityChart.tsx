import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Frequency } from '../../types';

interface DailyActivityChartProps {
  dailyFrequency: Frequency;
}

export const DailyActivityChart: React.FC<DailyActivityChartProps> = ({ dailyFrequency }) => {
  // Sort days in correct order
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedData = daysOrder.map(day => ({
    day,
    count: dailyFrequency[day] || 0
  }));

  const data = {
    labels: sortedData.map(d => d.day),
    datasets: [{
      label: 'Messages',
      data: sortedData.map(d => d.count),
      backgroundColor: 'rgba(129, 140, 248, 0.6)',
      borderColor: 'rgba(129, 140, 248, 1)',
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'white' }
      },
      title: {
        display: true,
        text: 'Daily Message Distribution',
        color: 'white'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Daily Activity</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
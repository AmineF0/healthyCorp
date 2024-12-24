import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Frequency } from '../../types';

interface DailyFrequencyCardProps {
  dailyFrequency: Frequency;
}

export const DailyFrequencyCard: React.FC<DailyFrequencyCardProps> = ({ dailyFrequency }) => {
  const sortedDays = Object.entries(dailyFrequency)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      count
    }));

  const data = {
    labels: sortedDays.map(day => day.date),
    datasets: [
      {
        label: 'Messages per Day',
        data: sortedDays.map(day => day.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'white' },
      },
      title: {
        display: true,
        text: 'Daily Message Frequency',
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
        ticks: { 
          color: 'white',
          maxRotation: 45,
          minRotation: 45,
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Daily Message Frequency</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
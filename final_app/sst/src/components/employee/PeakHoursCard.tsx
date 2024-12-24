import React from 'react';
import { Bar } from 'react-chartjs-2';
import { PeakHours } from '../../types';

interface PeakHoursCardProps {
  peakHours: PeakHours;
}

export const PeakHoursCard: React.FC<PeakHoursCardProps> = ({ peakHours }) => {
  // Convert 24-hour format to 12-hour format
  const formatHour = (hour: string) => {
    const hourNum = parseInt(hour);
    if (hourNum === 0) return '12 AM';
    if (hourNum === 12) return '12 PM';
    return hourNum > 12 
      ? `${hourNum - 12} PM` 
      : `${hourNum} AM`;
  };

  const data = {
    labels: Object.keys(peakHours).map(formatHour),
    datasets: [
      {
        label: 'Messages',
        data: Object.values(peakHours),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 4,
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
        text: 'Peak Activity Hours',
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
      <h2 className="text-xl font-bold text-white mb-4">Peak Hours Activity</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
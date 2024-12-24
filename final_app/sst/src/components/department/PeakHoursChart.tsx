import React from 'react';
import { Bar } from 'react-chartjs-2';
import { PeakHours } from '../../types';

interface PeakHoursChartProps {
  peakHours: PeakHours;
}

export const PeakHoursChart: React.FC<PeakHoursChartProps> = ({ peakHours }) => {
  const formatHour = (hour: string) => {
    const hourNum = parseInt(hour);
    return hourNum === 12 ? '12 PM' : 
           hourNum === 0 ? '12 AM' : 
           hourNum > 12 ? `${hourNum - 12} PM` : 
           `${hourNum} AM`;
  };

  const data = {
    labels: Object.keys(peakHours).map(formatHour),
    datasets: [{
      label: 'Messages',
      data: Object.values(peakHours),
      backgroundColor: 'rgba(52, 211, 153, 0.6)',
      borderColor: 'rgba(52, 211, 153, 1)',
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
        text: 'Peak Activity Hours',
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
      <h2 className="text-xl font-bold text-white mb-4">Peak Hours</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
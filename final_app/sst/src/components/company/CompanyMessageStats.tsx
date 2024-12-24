import React from 'react';
import { Bar } from 'react-chartjs-2';
import { messageStatistics } from '../../data/messageStatistics';

export const CompanyMessageStats = () => {
  const { company_level } = messageStatistics;
  
  // Format hours for better display
  const formatHour = (hour: string) => {
    const hourNum = parseInt(hour);
    return hourNum === 12 ? '12 PM' : 
           hourNum === 0 ? '12 AM' : 
           hourNum > 12 ? `${hourNum - 12} PM` : 
           `${hourNum} AM`;
  };

  // Hourly frequency data
  const hourlyData = {
    labels: Object.keys(company_level.message_frequency.hourly).map(formatHour),
    datasets: [{
      label: 'Messages per Hour',
      data: Object.values(company_level.message_frequency.hourly),
      backgroundColor: 'rgba(129, 140, 248, 0.6)',
      borderColor: 'rgba(129, 140, 248, 1)',
      borderWidth: 1,
    }]
  };

  // Daily frequency data
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dailyData = {
    labels: daysOrder,
    datasets: [{
      label: 'Messages per Day',
      data: daysOrder.map(day => company_level.message_frequency.daily[day] || 0),
      backgroundColor: 'rgba(52, 211, 153, 0.6)',
      borderColor: 'rgba(52, 211, 153, 1)',
      borderWidth: 1,
    }]
  };

  // Peak hours data
  const peakHoursData = {
    labels: Object.keys(company_level.peak_hours).map(formatHour),
    datasets: [{
      label: 'Peak Hour Messages',
      data: Object.values(company_level.peak_hours),
      backgroundColor: 'rgba(251, 146, 60, 0.6)',
      borderColor: 'rgba(251, 146, 60, 1)',
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'white' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { 
          color: 'white',
          maxRotation: 45,
          minRotation: 45
        },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-6">Message Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Hourly Distribution</h3>
            <Bar data={hourlyData} options={chartOptions} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Daily Distribution</h3>
            <Bar data={dailyData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Peak Hours</h3>
          <Bar data={peakHoursData} options={chartOptions} />
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Response Times</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400 mb-1">Average</p>
              <p className="text-2xl font-bold text-white">
                {company_level.response_times.average_hours.toFixed(1)}h
              </p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400 mb-1">Median</p>
              <p className="text-2xl font-bold text-white">
                {company_level.response_times.median_hours.toFixed(1)}h
              </p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400 mb-1">Maximum</p>
              <p className="text-2xl font-bold text-white">
                {company_level.response_times.max_hours.toFixed(1)}h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
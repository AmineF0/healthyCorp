import React from 'react';
import { Pie } from 'react-chartjs-2';
import { TopRecipient } from '../../types';

interface PeopleInteractionsCardProps {
  recipients: TopRecipient[];
}

export const PeopleInteractionsCard: React.FC<PeopleInteractionsCardProps> = ({ recipients }) => {
  const data = {
    labels: recipients.map(r => r.name_receiver),
    datasets: [
      {
        data: recipients.map(r => r.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { color: 'white' },
      },
      title: {
        display: true,
        text: 'Messages per Person',
        color: 'white',
      },
    },
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">People Interactions</h2>
      <Pie data={data} options={options} />
    </div>
  );
};
import React from 'react';
import { Clock } from 'lucide-react';
import { ResponseTimes } from '../../types';

interface ResponseTimesCardProps {
  responseTimes: ResponseTimes;
}

export const ResponseTimesCard: React.FC<ResponseTimesCardProps> = ({ responseTimes }) => {
  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    }
    return `${hours.toFixed(1)} hours`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-indigo-400 w-6 h-6" />
        <h2 className="text-xl font-bold text-white">Response Times</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="text-gray-300 mb-2">Average</div>
          <div className="text-2xl font-bold text-white">
            {formatHours(responseTimes.average_hours)}
          </div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="text-gray-300 mb-2">Median</div>
          <div className="text-2xl font-bold text-white">
            {formatHours(responseTimes.median_hours)}
          </div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="text-gray-300 mb-2">Maximum</div>
          <div className="text-2xl font-bold text-white">
            {formatHours(responseTimes.max_hours)}
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Clock, ArrowUp, ArrowDown, Activity } from 'lucide-react';

interface ResponseTimesCardProps {
  responseTimes: {
    average_hours: number;
    median_hours: number;
    max_hours: number;
  };
}

const formatTime = (hours: number) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  return `${hours.toFixed(1)}h`;
};

export const ResponseTimesCard: React.FC<ResponseTimesCardProps> = ({ responseTimes }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="text-blue-400 w-6 h-6" />
        <h2 className="text-xl font-bold text-white">Response Times</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">Average</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatTime(responseTimes.average_hours)}
          </div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUp className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">Median</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatTime(responseTimes.median_hours)}
          </div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDown className="w-5 h-5 text-red-400" />
            <span className="text-gray-300">Maximum</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatTime(responseTimes.max_hours)}
          </div>
        </div>
      </div>
    </div>
  );
};
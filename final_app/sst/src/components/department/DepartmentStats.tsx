import React from 'react';
import { Statistics } from '../../types';
import { Users, Clock, CheckSquare } from 'lucide-react';

interface DepartmentStatsProps {
  stats: Statistics;
}

export const DepartmentStats: React.FC<DepartmentStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Department Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-blue-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Tasks</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Tasks</span>
              <span className="text-white font-semibold">{stats.total_tasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Completion Rate</span>
              <span className="text-white font-semibold">
                {(stats.task_metrics.completion_rate * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-green-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Workload</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Hours</span>
              <span className="text-white font-semibold">
                {stats.workload_statistics.total_estimated_hours}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Avg Hours/Task</span>
              <span className="text-white font-semibold">
                {stats.workload_statistics.average_hours_per_task.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <CheckSquare className="text-purple-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Priority</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(stats.priority_distribution).map(([priority, count]) => (
              <div key={priority} className="flex justify-between">
                <span className="text-gray-300">{priority}</span>
                <span className="text-white font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
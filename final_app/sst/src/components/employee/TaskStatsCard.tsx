import React from 'react';
import { Statistics } from '../../types';
import { Clock, Calendar, CheckSquare } from 'lucide-react';

interface TaskStatsCardProps {
  stats: Statistics;
}

export const TaskStatsCard: React.FC<TaskStatsCardProps> = ({ stats }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Task Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Workload</h3>
          </div>
          <div className="space-y-2 text-gray-300">
            <p>Total Hours: {stats.workload_statistics.total_estimated_hours}</p>
            <p>Avg per Task: {stats.workload_statistics.average_hours_per_task.toFixed(1)}</p>
            <p>Range: {stats.workload_statistics.min_hours} - {stats.workload_statistics.max_hours} hrs</p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-green-400" />
            <h3 className="text-lg font-semibold text-white">Timeline</h3>
          </div>
          <div className="space-y-2 text-gray-300">
            <p>Start: {new Date(stats.date_statistics.earliest_task).toLocaleDateString()}</p>
            <p>End: {new Date(stats.date_statistics.latest_task).toLocaleDateString()}</p>
            <p>Span: {stats.date_statistics.total_days_span} days</p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Tasks</h3>
          </div>
          <div className="space-y-2 text-gray-300">
            <p>Total Tasks: {stats.total_tasks}</p>
            <p>Completion: {(stats.task_metrics.completion_rate * 100).toFixed(1)}%</p>
            <p>Tasks with Hours: {stats.task_metrics.tasks_with_hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
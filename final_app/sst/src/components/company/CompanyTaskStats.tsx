import React from 'react';
import { Clock, CheckSquare, AlertTriangle } from 'lucide-react';
import { companyStatistics } from '../../data/companyStatistics';

export const CompanyTaskStats = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Task Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task Distribution */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <CheckSquare className="text-blue-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Tasks</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Tasks</span>
              <span className="text-white font-semibold">{companyStatistics.total_tasks}</span>
            </div>
            <div className="space-y-2">
              {Object.entries(companyStatistics.priority_distribution).map(([priority, count]) => (
                <div key={priority} className="flex justify-between">
                  <span className="text-gray-300">{priority} Priority</span>
                  <span className="text-white font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workload Statistics */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-green-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Hours</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Hours</span>
              <span className="text-white font-semibold">
                {companyStatistics.workload_statistics.total_estimated_hours}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Average per Task</span>
              <span className="text-white font-semibold">
                {companyStatistics.workload_statistics.average_hours_per_task.toFixed(1)}h
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Median Hours</span>
              <span className="text-white font-semibold">
                {companyStatistics.workload_statistics.median_hours}h
              </span>
            </div>
          </div>
        </div>

        {/* Task Range */}
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-purple-400 w-6 h-6" />
            <h3 className="text-lg font-semibold text-white">Range</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Min Hours</span>
              <span className="text-white font-semibold">
                {companyStatistics.workload_statistics.min_hours}h
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Max Hours</span>
              <span className="text-white font-semibold">
                {companyStatistics.workload_statistics.max_hours}h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
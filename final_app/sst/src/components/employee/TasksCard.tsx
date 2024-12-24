import React from 'react';
import { Task } from '../../types';
import { AlertCircle, Clock, Calendar } from 'lucide-react';

interface TasksCardProps {
  tasks: Task[];
}

export const TasksCard: React.FC<TasksCardProps> = ({ tasks }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Tasks</h2>
      <div className="max-h-96 overflow-y-auto">
        {tasks.map((task, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg mb-3">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-semibold">{task.task}</h3>
              <span className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                <AlertCircle size={16} />
                {task.priority}
              </span>
            </div>
            <div className="flex gap-4 text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(task.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {task.estimated_hours}h
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};